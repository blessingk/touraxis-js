import express, {Request, Response} from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router({ mergeParams: true });

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:taskId', async (req: Request, res: Response) => {
    await getTask(req, res);
});
router.put('/:taskId', async (req: Request, res: Response) => {
    await updateTask(req, res);
});
router.delete('/:taskId', async (req: Request, res: Response) => {
    await deleteTask(req, res);
});

export default router;