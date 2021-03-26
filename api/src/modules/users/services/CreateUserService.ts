import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/schema/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) {}

  public async run({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByMail(email);

    if (checkUserExists) throw new AppError('Email address already used.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
