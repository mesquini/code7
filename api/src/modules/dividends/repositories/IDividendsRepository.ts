import ICreateDividendDTO from "../dtos/ICreateDividendDTO";
import Dividends from "../infra/typeorm/schema/Dividends";

export default interface IDividendsRepository {
  findAll(): Promise<Dividends[]>;
  create(data: ICreateDividendDTO): Promise<Dividends>;
  update(data: Dividends): Promise<void>;
  delete(dividend_id: string): Promise<void>;
}
