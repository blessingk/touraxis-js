import { checkPendingTasks } from '../src/services/taskService';
import Task from '../src/models/Task';
import mongoose from 'mongoose';

jest.mock('../src/models/Task');

describe('Task Service', () => {
    it('should check and update overdue tasks', async () => {
        const mockTask = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            status: 'pending',
            date_time: new Date(Date.now() - 100000),
            updateOne: jest.fn(),
        };

        (Task.find as jest.Mock).mockResolvedValue([mockTask]);

        await checkPendingTasks();

        expect(mockTask.updateOne).toHaveBeenCalledWith({ status: 'done' });
    });
});
