import request from 'supertest';
import { app } from '../';
import mongoose from "mongoose";
import { connectDB } from '../src/config/database';

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
    console.log('MongoDB connected');
});

afterAll(async () => {
    await mongoose.disconnect();
});

const createUserAndTask = async () => {
    const user = await request(app).post('/api/users').send({ username: 'user1', first_name: 'John', last_name: 'Doe' });
    const task = await request(app).post(`/api/users/${user.body._id}/tasks`).send({ name: 'Test Task', description: 'Test Description', next_execute_date_time: new Date() });
    return { user: user.body, task: task.body };
};

describe('Task Routes', () => {
    jest.setTimeout(60000);
    it('should create a new task for a user', async () => {
        const { user, task } = await createUserAndTask();
        const res = await request(app).get(`/api/users/${user._id}/tasks`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe('Test Task');
    });

    it('should get a task by id', async () => {
        const { task } = await createUserAndTask();
        const res = await request(app).get(`/api/users/${task.userId}/tasks/${task._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Test Task');
    });

    it('should update a task', async () => {
        const { task } = await createUserAndTask();
        const updatedData = { description: 'Updated Task Description' };
        const res = await request(app).put(`/api/users/${task.userId}/tasks/${task._id}`).send(updatedData);
        expect(res.status).toBe(200);
        const updatedTask = await request(app).get(`/api/users/${task.userId}/tasks/${task._id}`);
        expect(updatedTask.body.description).toBe('Updated Task Description');
    });

    it('should delete a task', async () => {
        const { task } = await createUserAndTask();
        const res = await request(app).delete(`/api/users/${task.userId}/tasks/${task._id}`);
        expect(res.status).toBe(204);
        const deletedTask = await request(app).get(`/api/users/${task.userId}/tasks/${task._id}`);
        expect(deletedTask.status).toBe(404);
    });
});
