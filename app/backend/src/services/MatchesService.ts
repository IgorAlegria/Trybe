import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatcheService {
  constructor(
    private matches: IMatchesModel = new MatchesModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const getAllMatches = await this.matches.findAll();
    return { status: 'SUCCESSFUL', data: getAllMatches };
  }
}
