import { Request, Response } from 'express';
import { validateRideConfirm } from '../services/validationService';
import { RideRepository } from '../repositories/rideRepository';

export class RideConfirm {
  public static rideConfirm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer_id, origin, destination, driver: { id: driver_id, name: driver_name }, distance, duration, value } = req.body;
      await validateRideConfirm(customer_id, origin, destination, driver_id, distance);
      
      const rideDatabase: IRide = {
        customer_id,
        origin,
        date: new Date().toString(),
        destination,
        distance,
        duration,
        driver_id,
        driver_name,
        value
      }
      await RideRepository.saveRide(rideDatabase);
      res.status(200).json({ success: true });
    } catch (error: any) {
      const errorMessage = error.message;
      if (errorMessage === "Motorista informado não foi encontrado") {
        res.status(404).json({ error_code: "DRIVER_NOT_FOUND", error_description: errorMessage });
      } else if (errorMessage === "A distância da corrida não é compatível com o motorista selecionado") {
        res.status(406).json({ error_code: "INVALID_DISTANCE", error_description: errorMessage });
      } else {
        res.status(400).json({ error_code: "INVALID_DATA", error_description: errorMessage });
      }
    }
  }
}
