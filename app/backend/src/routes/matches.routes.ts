import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import ValidationLogin from '../Middlewares/loginValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
router.patch(
  '/:id/finish',
  ValidationLogin.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  ValidationLogin.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
