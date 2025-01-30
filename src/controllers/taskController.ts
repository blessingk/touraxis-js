import { Request, Response } from 'express';
import Task from '../models/Task';

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    try {
        const task = new Task({
            ...req.body,
            userId: req.params.userId,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

// Get all tasks for a user
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Get a single task by taskId
export const getTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
