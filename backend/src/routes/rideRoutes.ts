import { Router } from 'express';
import { Request, Response } from 'express';
import { getRideEstimate, rideConfirm, customerRides, getDrivers } from '../controllers/rideController';

const rideRouter = Router();

rideRouter.post('/estimate', async (req: Request, res: Response) => await getRideEstimate(req, res));

rideRouter.patch('/confirm', async (req: Request, res: Response) => await rideConfirm(req, res));

rideRouter.get('/:customer_id', async (req: Request, res: Response) => await customerRides(req, res))

rideRouter.get('/drivers', async (req:Request, res: Response) => await getDrivers(req, res));

export default rideRouter;
