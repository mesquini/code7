import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/schema/Users';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user,
      {
        id: Date.now().toString(),
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      }
      );

    this.users.push(user);

    return user;
  }

  public async findByMail(email: string): Promise<User | null> {
    const findUser = this.users.find(user => user.email === email);

    return findUser || null;
  }

}

export default UsersRepository;
