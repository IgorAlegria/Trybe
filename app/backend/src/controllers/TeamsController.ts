import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const response = await this.teamsService.getAllTeams();
    res.status(200).json(response.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamsService.getTeamById(Number(id));

    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    res.status(200).json(response.data);
  }
}
