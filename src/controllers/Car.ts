import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _services: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const { body } = req;
    const result = await this._services.create(body);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const result = await this._services.read();
    return res.status(200).json(result);
  }
}