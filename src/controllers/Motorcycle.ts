import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class Motorcycle {
  constructor(private _services: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { body } = req;
    const result = await this._services.create(body);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const result = await this._services.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { params } = req;
    const result = await this._services.readOne(params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { params, body } = req;
    const result = await this._services.update(params.id, body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IMotorcycle>) {
    const { params } = req;
    await this._services.delete(params.id);
    return res.status(204).send();
  }
}