import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    id: string;
    name: string;
    description: string;
    next_execute_date_time: Date;
    status: string;
    userId: mongoose.Types.ObjectId;
}

// Define the Task schema
const taskSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        next_execute_date_time: { type: Date},
        status: { type: String, default: 'pending' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Create the Task model
const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
