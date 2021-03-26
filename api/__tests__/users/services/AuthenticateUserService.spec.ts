import AppError from '@shared/errors/AppError';

import AuthUserService from '@modules/users/services/AuthUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/Fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authUserService: AuthUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
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
  it('should be able to authenticate', async () => {
    const user = await createUserService.run({
      name: 'Admin',
      email: 'admin@debts.com',
      password: '123123'
    });

    const response = await authUserService.run({
      email: 'admin@debts.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authUserService.run({
        email: 'jonhdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.run({
      name: 'Admin',
      email: 'admin@debts.com',
      password: '123123'
    });

    await expect(
      authUserService.run({
        email: 'admin@debts.com',
        password: '223123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
