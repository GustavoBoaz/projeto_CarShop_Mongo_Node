import { z } from 'zod';
import { vehicleZodSchema as VZS } from './IVehicle'; 

const carZodSchema = VZS.extend({
  doorsQty: z.number().int().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
});

type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema, ICar };