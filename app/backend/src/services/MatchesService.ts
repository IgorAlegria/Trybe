import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matches: IMatchesModel = new MatchesModel(),
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
  ): Promise<boolean> {
    await this.matches.updateMatch(id, homeTeam, awayTeam);
    return true;
  }
}
