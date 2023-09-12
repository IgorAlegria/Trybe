import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UsersModel implements IUserModel {
  private model = SequelizeUser;

  async findOne(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (dbData === null) return null;
    return dbData;
  }
}
