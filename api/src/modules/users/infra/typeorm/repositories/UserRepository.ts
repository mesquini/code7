import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUserRepository';

import User from '../schema/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    return this.ormRepository.save(data);
  }

  public async findByMail(email: string): Promise<User | null> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return findUser || null;
  }

}

export default UsersRepository;
