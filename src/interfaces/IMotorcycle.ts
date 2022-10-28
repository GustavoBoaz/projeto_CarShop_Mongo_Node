import { z } from 'zod';
import { vehicleZodSchema as VZS } from './IVehicle';

const motorcycleZodSchema = VZS.extend({
    category: z.enum(['Street', 'Custom', 'Trail']),
    engineCapacity: z.number().int().min(1).max(2500),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export {motorcycleZodSchema, IMotorcycle};