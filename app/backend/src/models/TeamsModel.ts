import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }
}
