import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const respose = await this.teamsService.getAllTeams();
    console.log(respose);
    res.status(200).json(respose);
  }
}
