import { inject, injectable } from "tsyringe";

import Dividends from "../infra/typeorm/schema/Dividends";
import IDividendsRepository from "../repositories/IDividendsRepository";

@injectable()
export default class UpdateDividendsService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendsRepository,
  ) {}

  public async run(data: Dividends): Promise<void> {
   await this.dividendsRepository.update(data);
  }
}
