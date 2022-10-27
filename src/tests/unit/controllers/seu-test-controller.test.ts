import * as sinon from 'sinon';
import Car from '../../../models/Car';
import CarServices from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { expect }  from 'chai';
import { carMock, carMockWithId } from '../../mocks/carsMock';
import { Request, Response } from 'express';

describe('Car Controller', () => {
  //GIVEN: Dado que tenho uma Model Car
  const carModel = new Car();
  //AND: E tenho serciços para Car
  const carService = new CarServices(carModel);
  //AND: E tenho um controlador para Car
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;
  
  before(async () => {  
    sinon.stub(carService, 'create').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Controle para criar um novo Car', () => {
    it('Sucesso ao criar', async () => {
      req.body =  carMock;
      //WHEN: Quando utilizo o controlador de create corretamente
      await carController.create(req, res);

      //THEN: Então devo receber o status 201
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });
});