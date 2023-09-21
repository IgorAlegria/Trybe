import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async get(req: Request, res: Response) {
    const response = await this.leaderboardService.home();
    res.status(200).json(response);
  }
}
