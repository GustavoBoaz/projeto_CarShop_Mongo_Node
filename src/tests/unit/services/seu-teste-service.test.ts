import * as sinon from 'sinon';
import Car from '../../../models/Car';
import CarServices from '../../../services/Car';
import { expect }  from 'chai';
import { carMock, carMockWithId } from '../../mocks/carsMock';

describe('Car Service', () => {
  //GIVEN: Dado que tenho uma Model Car
  const carModel = new Car();
  //AND: E tenho serciços para Car
  const carService = new CarServices(carModel);
  
  before(async () => {  
    sinon.stub(carModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Serviço para criar um novo Car', () => {
    it('Sucesso ao criar', async () => {
      //WHEN: Quando utilizo o serviço de create corretamente
      const result = await carService.create(carMock);

      //THEN: Então devo receber o Car criado
      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Falha ao criar', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de create errado
        await carService.create({});
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });
  });
});