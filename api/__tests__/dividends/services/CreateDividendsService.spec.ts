import faker from 'faker'

import FakeDividendsRepository from "../repositories/FakeDividendsRepository"
import CreateDividendsService from "@modules/dividends/services/CreateDividendsService";
import UpdateDividendsService from "@modules/dividends/services/UpdateDividendsService";
import FindAllDividendsService from "@modules/dividends/services/FindAllDividendsService";
import DeleteDividendsService from "@modules/dividends/services/DeleteDividendsService";

let fakeDividendsRepository: FakeDividendsRepository;
let createDividend: CreateDividendsService;
let updateDividends: UpdateDividendsService;
let findAllDividends: FindAllDividendsService;
let deleteDividends: DeleteDividendsService;

describe('CreateDividend', () => {
  beforeEach(() => {
    fakeDividendsRepository = new FakeDividendsRepository();

    createDividend = new CreateDividendsService(fakeDividendsRepository);
    updateDividends = new UpdateDividendsService(fakeDividendsRepository);
    findAllDividends = new FindAllDividendsService(fakeDividendsRepository);
    deleteDividends = new DeleteDividendsService(fakeDividendsRepository);
  });

  it('should be able to create a new dividend', async () => {
    const dividend = await createDividend.run({
      name: faker.name.findName(),
      price: faker.commerce.price(),
      user_id: faker.random.number(),
      reason: faker.lorem.words(5),
      date: faker.date.recent().toString()
    });

    expect(dividend).toHaveProperty('id');
  });
});
