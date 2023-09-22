import IMatches from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class MatchesService {
  constructor(
    private matches: IMatchesModel = new MatchesModel(),
    private teams: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    const getAllMatches = await this.matches.findAll();

    if (!inProgress) {
      return { status: 'SUCCESSFUL', data: getAllMatches };
    }

    if (inProgress === 'true') {
      const data = getAllMatches.filter((match) => match.inProgress === true);
      return { status: 'SUCCESSFUL', data };
    }

    const data = getAllMatches.filter((match) => match.inProgress === false);
    return { status: 'SUCCESSFUL', data };
  }

  public async finishMatch(id:number): Promise<ServiceResponse<{ message: string }>> {
    await this.matches.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeam: number,
    awayTeam: number,
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matches.updateMatch(id, homeTeam, awayTeam);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async create(data: IMatches): Promise<ServiceResponse<IMatches>> {
    const homeTeam = await this.teams.findById(data.homeTeamId);
    const awayTeam = await this.teams.findById(data.awayTeamId);

    if (data.homeTeamId === data.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matches.create(data);
    if (!newMatch) return { status: 'NOT_FOUND', data: { message: 'Failed to create the match' } };

    return { status: 'CREATED', data: newMatch };
  }
}
