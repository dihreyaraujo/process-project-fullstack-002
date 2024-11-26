import { Request, Response } from 'express';
import { calculateRoute } from '../services/googleMapsService';
import { validateRideRequest } from '../services/validationService';
import { DriverRepository } from '../repositories/driverRepository';

export class GetRideEstimate {
  public static getRideEstimate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer_id, origin, destination } = req.body;
  
      validateRideRequest(customer_id, origin, destination);
  
      const { distance, duration, startLocation, endLocation } = await calculateRoute(origin, destination);
  
      const drivers: IDriver[] = await DriverRepository.getAllDrivers();
  
      const updatedDriversToResponseFormat = drivers.map((driver) => {
        const [rating, ...commentParts] = driver.rating.split(' ');
        const rateNumber = parseFloat(driver.rate.replace('R$', '').replace(',', '.').replace('/km', ''));
        const comment = commentParts.join(' ');
        return {
          ...driver,
          review: {
            rating,
            comment
          },
          rate: rateNumber,
          rating: undefined
        };
      });
  
      const options: IRideEstimateOptions[] = updatedDriversToResponseFormat
        .filter((driver) => distance >= driver.minKm)
        .map((driver) => ({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: `${driver.vehicle}`,
          review: {
            rating: Number(driver.review.rating.split('')[0]),
            comment: driver.review.comment,
          },
          value: Number((distance * driver.rate).toFixed(2)),
        }));
  
      options.sort((a, b) => a.value - b.value);

      const responseEstimate: IRideEstimate = {
        origin: startLocation,
        destination: endLocation,
        distance,
        duration: duration.toString(),
        options,
        routeResponse: {
          method: "POST",
          endpoint: "/ride/estimate"
        }
      }
  
      res.status(200).json(responseEstimate);
    } catch (error: any) {
      res.status(400).json({ error_code: "INVALID_DATA", error_description: error.message });
    }
  };
}
