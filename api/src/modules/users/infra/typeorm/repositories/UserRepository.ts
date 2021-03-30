import { getMongoRepository, MongoRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUserRepository';

import Users from '../schema/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<Users>;

  constructor() {
    this.ormRepository = getMongoRepository(Users);
  }

  public async create(data: ICreateUserDTO): Promise<Users> {
    return this.ormRepository.save(data);
  }

  public async findByMail(email: string): Promise<Users | null> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return findUser || null;
  }

}

export default UsersRepository;
