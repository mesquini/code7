import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@configs/auth';
import AppError from '@shared/errors/AppError';
import Users from '../infra/typeorm/schema/Users';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByMail(email);

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination', 401);

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({ id: user.id }, secret, {
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
