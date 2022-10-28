import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import Motorcycle from '../models/Motorcycle';
import MotorcycleServices from '../services/Motorcycle';

const motorcycleRoute = Router();
const motorcycleModel = new Motorcycle();
const motorcycleServices = new MotorcycleServices(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleServices);

motorcycleRoute.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRoute.get('/motorcycles', (req, res) => motorcycleController.read(req, res));

const pathId = '/motorcycles/:id';
motorcycleRoute.get(pathId, (req, res) => motorcycleController.readOne(req, res));
motorcycleRoute.put(pathId, (req, res) => motorcycleController.update(req, res));
motorcycleRoute.delete(pathId, (req, res) => motorcycleController.delete(req, res));

export default motorcycleRoute;