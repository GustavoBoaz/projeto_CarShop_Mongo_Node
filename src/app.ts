import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRoute from './router/Car';
import motorcycleRoute from './router/Motorcycle';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(motorcycleRoute);
app.use(errorHandler);

export default app;
