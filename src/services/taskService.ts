import Task from '../models/Task';

export const checkPendingTasks = async () => {
    const overdueTasks = await Task.find({ status: 'pending', next_execute_date_time: { $lt: new Date() } });

    for (const task of overdueTasks) {
        await task.updateOne({ status: 'done' });
    }
};
