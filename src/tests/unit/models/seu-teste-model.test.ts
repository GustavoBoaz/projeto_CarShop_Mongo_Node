import * as sinon from 'sinon';
import chai from 'chai';
import Car from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carsMock';

const { expect } = chai;

describe('Car Model', () => {
  //GIVEN: Dado que tenho uma Model Car
  const carModel = new Car();
  
  before(async () => {  
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Criando um novo Car', () => {
    it('Sucesso ao criar', async () => {
      //WHEN: Quando passo crio um novo Car
      const result = await carModel.create(carMock);

      //THEN: Então devo receber o Car criado
      expect(result).to.be.deep.equal(carMockWithId);
    });
  });
});