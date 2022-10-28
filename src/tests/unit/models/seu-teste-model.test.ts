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
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(Error);
    sinon.stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(Error);
    sinon.stub(Model, 'findOneAndDelete')
      .onCall(0).resolves(null)
      .onCall(1).resolves(Error);
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

  describe('Consultando Car', () => {
    it('Sucesso ao consultar lista de Car', async () => {
      //WHEN: Quando consulto uma lista de Car
      const result = await carModel.read();

      //THEN: Então devo receber uma lista com 1 Car
      expect(result.length).to.be.deep.equal(1);
    });

    it('Sucesso ao consultar 1 Car', async () => {
      //WHEN: Quando consulto pelo id 6359e47b94dc48d1e10c2f20 de Car
      const result = await carModel.readOne('6359e47b94dc48d1e10c2f20');

      //THEN: Então devo receber Car
      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Falha ao consultar 1 Car com Id mal formatado', async () => {
      //WHEN: Quando consulto pelo id XXX de Car
      let result;
      try {
        await carModel.readOne('6359e47b94dc48d1e10c2fXX');
      } catch (error) {
        result = error;
      }

      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });
  });

  describe('Manutenção de Car', () => {
    it('Sucesso ao atualizar Car', async () => {
      //WHEN: Quando atualizo Car de id 6359e47b94dc48d1e10c2f20
      const result = await carModel.update('6359e47b94dc48d1e10c2f20', carMockWithId);

      //THEN: Então devo receber car atualizado
      expect(result).to.be.deep.equal(carMockWithId);
    });

    it('Falha ao atualizar 1 Car com Id mal formatado', async () => {
      //WHEN: Quando atualizo pelo 6359e47b94dc48d1e10c2fXX de Car
      let result;
      try {
        await carModel.update('6359e47b94dc48d1e10c2fXX', carMockWithId);
      } catch (error) {
        result = error;
      }

      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });

    it('Sucesso ao deletar Car', async () => {
      //WHEN: Quando removo Car de id 6359e47b94dc48d1e10c2f20
      const result = await carModel.delete('6359e47b94dc48d1e10c2f20');

      //THEN: Então devo receber car atualizado
      expect(result).to.be.deep.equal(null);
    });

    it('Falha ao deletar 1 Car com Id mal formatado', async () => {
      //WHEN: Quando deletp pelo id 6359e47b94dc48d1e10c2fXX de Car
      let result;
      try {
        await carModel.delete('6359e47b94dc48d1e10c2fXX');
      } catch (error) {
        result = error;
      }

      //THEN: Então devo receber um Error
      expect(result).to.be.instanceOf(Error);
    });
  });
});