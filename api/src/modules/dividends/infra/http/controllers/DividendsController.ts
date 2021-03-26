import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateDividendsService from "@modules/dividends/services/CreateDividendsService";
import UpdateDividendsService from "@modules/dividends/services/UpdateDividendsService";
import DeleteDividendsService from "@modules/dividends/services/DeleteDividendsService";
import FindAllDividendsService from "@modules/dividends/services/FindAllDividendsService";

export default class DividendsController {
  public async show(req: Request, res: Response): Promise<Response>{
    const findAllDividends = container.resolve(FindAllDividendsService);

    const dividends = await findAllDividends.run();

    return res.status(200).json(dividends);
  }

  public async create(req: Request, res: Response): Promise<Response>{
    const createDividends = container.resolve(CreateDividendsService);

    const dividend = await createDividends.run(req.body);

    return res.status(201).json(dividend);
  }

  public async update(req: Request, res: Response): Promise<Response>{
    const updateDividends = container.resolve(UpdateDividendsService);

    await updateDividends.run(req.body);

    return res.status(204).send();
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    const deleteDividends = container.resolve(DeleteDividendsService);

    await deleteDividends.run(req.params.id);

    return res.status(204).send();
  }
}
