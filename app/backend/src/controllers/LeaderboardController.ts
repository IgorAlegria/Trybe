import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async get(req: Request, res: Response) {
    const url = req.baseUrl.split('/');
    const { data } = await this.leaderboardService
      .getClassifications(url[2] === undefined ? 'leaderboard' : url[2]);
    res.status(200).json(data);
  }
}
