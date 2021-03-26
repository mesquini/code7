import AppError from '@shared/errors/AppError';

import AuthUserService from '@modules/users/services/AuthUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authUserService: AuthUserService;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeHashProvider = new FakeHashProvider();

    authUserService = new AuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able create a user', async () => {
    const user = await createUserService.run({
      name: 'Admin',
      email: 'admin@debts.com',
      password: '123123'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create a user with equals email', async () => {
    await createUserService.run({
      name: 'Admin',
      email: 'admin@debts.com',
      password: '123123'
    });

    await expect(
      createUserService.run({
        name: 'Admin 2',
        email: 'admin@debts.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
