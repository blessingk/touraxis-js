import request from 'supertest';
import { app } from '../';
import mongoose from "mongoose";

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
});

const createUser = async (userData = { username: 'testuser', first_name: 'Test', last_name: 'User' }) => {
    const res = await request(app).post('/api/users').send(userData);
    return res.body;
};

describe('User Routes', () => {
    jest.setTimeout(3000);
    it('should create a new user', async () => {
        const user = await createUser();
        expect(user).toHaveProperty('_id');
        expect(user.username).toBe('testuser');
    });

    it('should get a list of users', async () => {
        await createUser();
        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
    });

    it('should get a user by id', async () => {
        const user = await createUser();
        const res = await request(app).get(`/api/users/${user._id}`);
        expect(res.status).toBe(200);
        expect(res.body.username).toBe('testuser');
    });

    it('should update a user', async () => {
        const user = await createUser();
        const updatedData = { first_name: 'Updated' };
        const res = await request(app).put(`/api/users/${user._id}`).send(updatedData);
        expect(res.status).toBe(200);
        const updatedUser = await request(app).get(`/api/users/${user._id}`);
        expect(updatedUser.body.first_name).toBe('Updated');
    });
});
