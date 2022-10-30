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
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null)
      .onCall(3).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(1).resolves(null);
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

  describe('Serviço para manutenção de Car', () => {
    it('Sucesso ao atualizar', async () => {
      //WHEN: Quando utilizo o serviço de update corretamente
      const result = await carService.update('6359e47b94dc48d1e10c2f20', carMockWithId);

      //THEN: Então devo receber o Car alterado
      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Falha na atualização com o Id mal formatado', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de update com Id mal formatado
        await carService.update('XXX', carMockWithId);
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });

    it('Falha na atualização com o Id inexistente', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de alteração com Id inexistente
        await carService.update('6359e47b94dc48d1e10c2fXX', carMockWithId);
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });

    it('Falha na atualização com o body errado', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de alteração com body da requisição errado
        await carService.update('6359e47b94dc48d1e10c2f20', {});
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });

    it('Sucesso para deletar Car', async () => {

      //WHEN: Quando utilizo o serviço de adeletar com Id valido
      const result = await carService.delete('6359e47b94dc48d1e10c2f20');
      
      //THEN: Então devo receber entidade deletada
      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Falha para deletar com Id mal formatado', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de deletar com id mal formatado
        await carService.delete('XXX');
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });

    it('Falha para deletar com Id inesistente', async () => {
      let result;
      try {
        //WHEN: Quando utilizo o serviço de deletar com Id inesistente
        await carService.delete('6359e47b94dc48d1e10c2fXX');
      } catch (error) {
        result = error;
      }
      
      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });
  });
});