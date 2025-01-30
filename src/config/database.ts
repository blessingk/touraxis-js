import mongoose from 'mongoose';

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/touraxis';

export const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
