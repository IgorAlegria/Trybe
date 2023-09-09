import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ITeams[]> {
    const allteams = await this.teamsModel.findAll();
    console.log(allteams);
    return allteams;
  }
}
