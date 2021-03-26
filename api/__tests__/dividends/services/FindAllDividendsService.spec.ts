import faker from 'faker'

import FakeDividendsRepository from "../repositories/FakeDividendsRepository"
import CreateDividendsService from "@modules/dividends/services/CreateDividendsService";
import FindAllDividendsService from "@modules/dividends/services/FindAllDividendsService";
import AppError from '@shared/errors/AppError';

let fakeDividendsRepository: FakeDividendsRepository;
let createDividend: CreateDividendsService;
let findAllDividends: FindAllDividendsService;

describe('FindAllDividend', () => {
  beforeEach(() => {
    fakeDividendsRepository = new FakeDividendsRepository();

    createDividend = new CreateDividendsService(fakeDividendsRepository);
    findAllDividends = new FindAllDividendsService(fakeDividendsRepository);
  });

  it('should be able to update a dividend', async () => {
    await createDividend.run({
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    });

    await createDividend.run({
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    });

    await createDividend.run({
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    });

    const dividents = await findAllDividends.run();

    expect(dividents.length).toEqual(3);
  });
});
