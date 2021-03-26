import faker from 'faker'

import FakeDividendsRepository from "../repositories/FakeDividendsRepository"
import CreateDividendsService from "@modules/dividends/services/CreateDividendsService";
import DeleteDividendsService from "@modules/dividends/services/DeleteDividendsService";
import AppError from '@shared/errors/AppError';

let fakeDividendsRepository: FakeDividendsRepository;
let createDividend: CreateDividendsService;
let deleteDividends: DeleteDividendsService;

describe('DeleteDividend', () => {
  beforeEach(() => {
    fakeDividendsRepository = new FakeDividendsRepository();

    createDividend = new CreateDividendsService(fakeDividendsRepository);
    deleteDividends = new DeleteDividendsService(fakeDividendsRepository);
  });

  it('should be able to update a dividend', async () => {
    const dividend = await createDividend.run({
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    });

    await expect(deleteDividends.run(dividend.id.toString())).resolves.not.toThrow(AppError);
  });
});
