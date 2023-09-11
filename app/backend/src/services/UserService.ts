import * as bcrypt from 'bcryptjs';
import JWT from '../Utils/JWT';
import UserModel from '../models/UsersModel';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async findOne(email: string, password: string): Promise<unknown> {
    const user = await this.userModel.findOne(email);
    if (!user) {
      return { status: 401, message: { message: 'Invalid email or password' } };
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return { status: 401, message: { message: 'Invalid email or password' } };
    }
    const token = await JWT.sign({ id: user.id,
      email: user.email });
    return { status: 200, message: { token } };
  }
}
