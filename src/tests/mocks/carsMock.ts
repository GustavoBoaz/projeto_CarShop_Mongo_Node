import { ICar } from '../../interfaces/ICar';

const carMock: ICar = {
  model: "Gol GTI",
  year: 1988,
  color: "white",
  status: true,
  buyValue: 35000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockWithId: ICar & { _id: string } = {
  _id: '6359e47b94dc48d1e10c2f20',
  model: "Gol GTI",
  year: 1988,
  color: "white",
  status: true,
  buyValue: 35000,
  doorsQty: 2,
  seatsQty: 2,
};

export { carMock, carMockWithId };