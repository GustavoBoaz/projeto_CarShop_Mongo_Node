import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarServices implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw new Error(ErrorTypes.InvalidRequest);
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const result = await this._car.readOne(_id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw new Error(ErrorTypes.InvalidRequest);

    const result = await this._car.update(_id, parsed.data);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    
    return result
  }
}

export default CarServices;