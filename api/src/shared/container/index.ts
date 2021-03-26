import { container } from 'tsyringe';

import '@modules/users/providers';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IDividendsRepository from '@modules/dividends/repositories/IDividendsRepository';
import DividendsRepository from '@modules/dividends/infra/typeorm/repositories/DividendsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDividendsRepository>(
  'DividendsRepository',
  DividendsRepository,
);
