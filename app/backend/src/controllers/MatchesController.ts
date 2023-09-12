import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatcheController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const response = await this.matchesService.findAll();
    res.status(200).json(response.data);
  }
}
