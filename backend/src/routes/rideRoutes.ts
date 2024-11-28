import { Router } from 'express';
import { Request, Response } from 'express';
import { GetDrivers } from '../controllers/GetDrivers';
import { GetRideEstimate } from '../controllers/GetRideEstimate';
import { RideConfirm } from '../controllers/RideConfirm';
import { RidesHistoricCustomer } from '../controllers/RidesHistoricCustomer';
import { getApiKey } from '../services/googleMapsService';

const rideRouter = Router();

rideRouter.post('/estimate', async (req: Request, res: Response) => await GetRideEstimate.getRideEstimate(req, res));

rideRouter.patch('/confirm', async (req: Request, res: Response) => await RideConfirm.rideConfirm(req, res));

rideRouter.get('/drivers', async (req:Request, res: Response) => await GetDrivers.getDrivers(req, res));

rideRouter.get('/apiKey', (req: Request, res: Response) => {
  const apiKey = getApiKey();
  res.status(200).json({ apiKey });
})

rideRouter.get('/:customer_id', async (req: Request, res: Response) => await RidesHistoricCustomer.customerRides(req, res));

rideRouter.get('/', (req: Request, res: Response) => {
  res.status(400).json({ error_code: "INVALID_DATA", error_description: "Por favor, informar usuário." })
})

export default rideRouter;
