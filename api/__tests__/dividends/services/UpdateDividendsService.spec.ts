import faker from 'faker'

import FakeDividendsRepository from "../repositories/FakeDividendsRepository"
import CreateDividendsService from "@modules/dividends/services/CreateDividendsService";
import UpdateDividendsService from "@modules/dividends/services/UpdateDividendsService";
import AppError from '@shared/errors/AppError';

let fakeDividendsRepository: FakeDividendsRepository;
let createDividend: CreateDividendsService;
let updateDividends: UpdateDividendsService;

describe('UpdateDividend', () => {
  beforeEach(() => {
    fakeDividendsRepository = new FakeDividendsRepository();

    createDividend = new CreateDividendsService(fakeDividendsRepository);
    updateDividends = new UpdateDividendsService(fakeDividendsRepository);
  });

  it('should be able to update a dividend', async () => {
    const dividend = await createDividend.run({
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    });

    const data = {
      ...dividend,
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    };

    await expect(updateDividends.run(data)).resolves.not.toThrow(AppError);
  });
});
