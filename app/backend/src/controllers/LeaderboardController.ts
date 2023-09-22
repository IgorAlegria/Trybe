import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(req: Request, res: Response) {
    const response = await this.leaderboardService.getLeaderboard(undefined);
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async home(req: Request, res: Response) {
    const response = await this.leaderboardService.getLeaderboard('home');
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async away(req: Request, res: Response) {
    const response = await this.leaderboardService.getLeaderboard('away');
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }
}
