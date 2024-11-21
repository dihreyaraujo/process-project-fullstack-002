import { Request, Response } from 'express';
import { calculateRoute } from '../services/googleMapsService';
import { validateRideRequest, validateRideConfirm, validateDriver, validateCustomer } from '../services/validationService';
import { DriverRepository } from '../repositories/driverRepository';
import { RideRepository } from '../repositories/rideRepository';

export const getRideEstimate = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination } = req.body;

    validateRideRequest(customer_id, origin, destination);

    const { distance, duration, startLocation, endLocation } = await calculateRoute(origin, destination);

    const drivers = await DriverRepository.getAllDrivers()

    const options = drivers
      .filter((driver) => distance >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: driver.comment,
        },
        value: Number((distance * driver.rate).toFixed(2)),
      }));

    options.sort((a, b) => a.value - b.value);

    res.status(200).json({
      origin: startLocation,
      destination: endLocation,
      distance,
      duration,
      options,
      routeResponse: {}
    });
  } catch (error: any) {
    res.status(400).json({ error_code: "INVALID_DATA", error_description: error.message });
  }
};

export const rideConfirm = async (req: Request, res: Response) => {
  try {
    const { customer_id, origin, destination, driver: { id: driver_id, name: driver_name }, distance, duration, value } = req.body;
    await validateRideConfirm(customer_id, origin, destination, driver_id, distance);
    const rideDatabase = {
      customer_id,
      origin,
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

export const customerRides = async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    validateCustomer(customer_id);

    const ridesCostumer = await RideRepository.getRidesByCustomer(customer_id);

    if (!ridesCostumer) {
      throw new Error("Nenhuma corrida registrada");
    }

    if (driver_id) {
      validateDriver(Number(driver_id));
      const filterRidesByDriver = ridesCostumer.filter((ride) => ride.driver_id === Number(driver_id));
      const rides = filterRidesByDriver.map((ride) => {
        const formatRidesResponse = {
          id: ride.id,
          date: "",
          origin: ride.origin,
          destination: ride.destination,
          distance: ride.distance,
          duration: ride.duration,
          driver: {
            id: Number(driver_id),
            name: ride.driver_name
          },
          value: ride.value
        }
        return formatRidesResponse;
      })
      const formatResponseWithDriver = {
        customer_id,
        rides
      }
      res.status(200).json(formatResponseWithDriver);
    } else {
      const ridesNoFilter = ridesCostumer.map((ride) => {
        const formatRidesResponse = {
          id: ride.id,
          date: "",
          origin: ride.origin,
          destination: ride.destination,
          distance: ride.distance,
          duration: ride.duration,
          driver: {
            id: Number(driver_id),
            name: ride.driver_name
          },
          value: ride.value
        }
        return formatRidesResponse;
      });
  
      const formatResponse = {
        customer_id,
        rides: ridesNoFilter
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
