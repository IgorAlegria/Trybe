import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async findOne(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const response = await this.userService.findOne(email, password);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.user;
    const response = await this.userService.getByRole(email);
    return res.status(mapStatusHTTP(response.status)).json({ role: response.data });
  }
}
