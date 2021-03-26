import ICreateDividendDTO from "@modules/dividends/dtos/ICreateDividendDTO";
import Dividends from "@modules/dividends/infra/typeorm/schema/Dividends";
import IDividendsRepository from "@modules/dividends/repositories/IDividendsRepository";

export default class FakeDividendsRepository implements IDividendsRepository{
  private dividends: Dividends[] = [];

  public async findAll(): Promise<Dividends[]> {
    return this.dividends;
  }

  public async create(data: ICreateDividendDTO): Promise<Dividends> {
    const dividend = new Dividends();

    Object.assign(dividend,
      {
        id: Date.now().toString(),
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      }
      );

    this.dividends.push(dividend);

    return dividend;
  }

  public async update(data: Dividends): Promise<void> {
    const dividendOne = this.dividends.find(dividend => dividend.id === data.id);

    if(dividendOne)
      this.dividends = this.dividends.map(dividend => {
        if(dividend.id === dividendOne.id) return dividendOne;
        else return dividend;
      });
  }

  public async delete(dividend_id: string): Promise<void> {
    this.dividends = this.dividends.filter(dividend => dividend.id.toString() !== dividend_id);
  }
}
