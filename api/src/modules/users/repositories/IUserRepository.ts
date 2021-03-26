import User from '../infra/typeorm/schema/User';

export default interface IUsersRepository {
  findByMail(email: string): Promise<User | null>;
}
