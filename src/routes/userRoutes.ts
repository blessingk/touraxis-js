import express, { Request, Response, RequestHandler } from 'express';
import {createUser, getUsers, getUser, updateUser, deleteUser} from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', async (req: Request, res: Response) => {
    await getUser(req, res);
});
router.put('/:id',  async (req: Request, res: Response) => {
    await updateUser(req, res);
});
router.delete('/:id', async (req: Request, res: Response) => {
    await deleteUser(req, res);
});

export default router;