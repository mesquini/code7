import { MongoRepository, getMongoRepository } from "typeorm";

import ICreateDividendDTO from "@modules/dividends/dtos/ICreateDividendDTO";
import IDividendsRepository from "@modules/dividends/repositories/IDividendsRepository";
import Dividends from "../schema/Dividends";

export default class DividendsRepository implements IDividendsRepository {
  private ormRepository: MongoRepository<Dividends>;

  constructor() {
    this.ormRepository = getMongoRepository(Dividends);
  }

  public async findAll(): Promise<Dividends[]> {
    return this.ormRepository.find();
  }

  public async create(data: ICreateDividendDTO): Promise<Dividends> {
    return this.ormRepository.save(data);
  }

  public async update(data: Dividends): Promise<void> {
    const dividend = await this.ormRepository.findOne(data.id);

    if(dividend)
      await this.ormRepository.save({id: dividend.id, price: data.price, reason: data.reason, date: data.date});
  }

  public async delete(dividend_id: string): Promise<void> {
    await this.ormRepository.delete(dividend_id);
  }
}
