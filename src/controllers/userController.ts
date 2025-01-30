import { Request, Response } from 'express';
import User from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().lean();
        res.json(users); // Respond with the users
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Respond with the found user
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Delete a task
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.taskId);
        if (!user) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
