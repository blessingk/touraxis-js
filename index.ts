import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes';
import taskRoutes from './src/routes/taskRoutes';
import { connectDB } from './src/config/database';  // Import the connection function
import schedule from 'node-schedule';
import { checkPendingTasks } from './src/services/taskService';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/tasks', taskRoutes);

connectDB().then(r => console.log('Connected to database...'));

if (process.env.NODE_ENV !== 'test') {

    // Schedule job to check pending tasks every minute
    schedule.scheduleJob('* * * * *', checkPendingTasks);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
