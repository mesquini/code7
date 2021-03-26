import { inject, injectable } from "tsyringe";

import Dividends from "../infra/typeorm/schema/Dividends";
import IDividendsRepository from "../repositories/IDividendsRepository";

@injectable()
export default class FindAllDividendsService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendsRepository,
  ) {}

  public async run(): Promise<Dividends[]> {
    return this.dividendsRepository.findAll();
  }
}
