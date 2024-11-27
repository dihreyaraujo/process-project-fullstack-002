import { Request, Response } from 'express';
import { validateDriver, validateCustomer } from '../services/validationService';
import { RideRepository } from '../repositories/rideRepository';

export class RidesHistoricCustomer {
  public static customerRides = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer_id } = req.params;
      const { driver_id } = req.query;
  
      validateCustomer(customer_id);
  
      const ridesCustomer: IRide[] = await RideRepository.getRidesByCustomer(customer_id);
  
      if (!ridesCustomer || ridesCustomer.length === 0) {
        throw new Error("Nenhuma corrida registrada");
      }
  
      if (driver_id) {
        await validateDriver(Number(driver_id));
        const filterRidesByDriver: IRide[] = ridesCustomer.filter((ride) => ride.driver_id === Number(driver_id));
        if (filterRidesByDriver.length === 0) {
          throw new Error("Nenhuma corrida registrada");
        }
        const rides = filterRidesByDriver.map((ride: any) => {
          const formatRidesResponse = {
            id: ride.id,
            date: new Date(ride.date),
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance.toFixed(2),
            duration: ride.duration,
            driver: {
              id: Number(ride.driver_id),
              name: ride.driver_name
            },
            value: ride.value
          }
          return formatRidesResponse;
        })
        const formatResponseWithDriver: IHistoricResponse = {
          customer_id,
          rides: rides.sort((rideA, rideB) => rideB.date.getTime() - rideA.date.getTime())
        }
        res.status(200).json(formatResponseWithDriver);
      } else {
        const ridesNoFilter = ridesCustomer.map((ride: any) => {
          const formatRidesResponse = {
            id: ride.id,
            date: new Date(ride.date),
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            driver: {
              id: Number(ride.driver_id),
              name: ride.driver_name
            },
            value: ride.value
          }
          return formatRidesResponse;
        });
    
        const formatResponse: IHistoricResponse = {
          customer_id,
          rides: ridesNoFilter.sort((rideA: any, rideB: any) => rideB.date.getTime() - rideA.date.getTime())
        };
    
        res.status(200).json(formatResponse);
      }
    } catch (error: any) {
      const errorMessage = error.message;
      if (errorMessage === "Motorista inválido") {
        res.status(400).json({ error_code: "INVALID_DRIVER", error_description: errorMessage });
      } else if (errorMessage === "Nenhuma corrida registrada") {
        res.status(404).json({ error_code: "NO_RIDES_FOUND", error_description: errorMessage });
      } else {
        res.status(400).json({ error_code: "INVALID_DATA", error_description: errorMessage });
      }
    }
  }
}
