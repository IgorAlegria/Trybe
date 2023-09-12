import * as bcrypt from 'bcryptjs';
import JWT from '../Utils/JWT';
import UserModel from '../models/UsersModel';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { IToken } from '../Interfaces/IToken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async findOne(email: string, password: string): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findOne(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = await JWT.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getByRole(email: string): Promise<ServiceResponse<string>> {
    const response = await this.userModel.findOne(email);

    if (!response) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }
    return { status: 'SUCCESSFUL', data: response.role };
  }
}
