import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';

export default class MatcheController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchesService.findAll(inProgress as string);
    res.status(200).json(response.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.matchesService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
