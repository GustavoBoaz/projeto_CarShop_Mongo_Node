import { Router } from 'express';
import CarController from '../controllers/Car';
import Car from '../models/Car';
import CarServices from '../services/Car';

const carRoute = Router();
const carModel = new Car();
const carServices = new CarServices(carModel);
const carController = new CarController(carServices);

carRoute.post('/cars', (req, res) => carController.create(req, res));
carRoute.get('/cars', (req, res) => carController.read(req, res));
carRoute.get('/cars/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/cars/:id', (req, res) => carController.update(req, res));
carRoute.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default carRoute;