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
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId);
  })

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

  describe('Serviços para consulta Car', () => {
    it('Listar todos Car', async () => {
      //WHEN: Quando utilizo o serviço read
      const result = await carService.read();

      //THEN: Então devo receber uma lista de Car
      expect(result.length).to.be.deep.equal(1);
    });

    it('Consulta um Car pelo Id', async () => {
      //WHEN: Quando utilizo o serviço readOne com um Id valido
      const result = await carService.readOne('6359e47b94dc48d1e10c2f20');

      //THEN: Então devo receber um objeto Car
      expect(result).to.be.deep.equal(carMockWithId);
    })

    it('Falha com o Id não existente bem formatado', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de create errado
        await carService.readOne('6359e47b94dc48d1e10c2f2XX');
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });

    it('Falha com o Id mal formatado', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de create errado
        await carService.readOne('XXX');
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });
  });

});