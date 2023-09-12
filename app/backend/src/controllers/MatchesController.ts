import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatcheController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchesService.findAll(inProgress as string);
    res.status(200).json(response.data);
  }
}
