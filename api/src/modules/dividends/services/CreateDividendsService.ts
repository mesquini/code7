import { inject, injectable } from "tsyringe";

import ICreateDividendDTO from "../dtos/ICreateDividendDTO";
import Dividends from "../infra/typeorm/schema/Dividends";
import IDividendsRepository from "../repositories/IDividendsRepository";

@injectable()
export default class CreateDividendsService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendsRepository,
  ) {}

  public async run(data: ICreateDividendDTO): Promise<Dividends> {
    return this.dividendsRepository.create(data);
  }
}
