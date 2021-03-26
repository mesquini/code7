import { inject, injectable } from "tsyringe";

import IDividendsRepository from "../repositories/IDividendsRepository";

@injectable()
export default class DeleteDividendsService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendsRepository,
  ) {}

  public async run(dividend_id: string): Promise<void> {
    this.dividendsRepository.delete(dividend_id);
  }
}
