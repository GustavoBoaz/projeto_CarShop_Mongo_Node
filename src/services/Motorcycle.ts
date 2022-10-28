import { ErrorTypes } from '../errors/catalog';
import { motorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class MotorcycleServices implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw new Error(ErrorTypes.InvalidRequest);
    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const result = await this._motorcycle.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw new Error(ErrorTypes.InvalidRequest);

    const result = await this._motorcycle.update(_id, parsed.data);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    
    return result;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const result = await this._motorcycle.delete(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}

export default MotorcycleServices;