import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import ValidationLogin from '../Middlewares/loginValidation';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  ValidationLogin.validate,
  (req: Request, res: Response) => userController.findOne(req, res),
);

router.get(
  '/role',
  ValidationLogin.validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
