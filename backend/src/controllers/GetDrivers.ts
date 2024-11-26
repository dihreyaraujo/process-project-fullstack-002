import { Request, Response } from 'express';
import { DriverRepository } from '../repositories/driverRepository';

export class GetDrivers {
  public static getDrivers = async (req: Request, res: Response): Promise<void> => {
    const drivers: IDriver[] = await DriverRepository.getAllDrivers();
    res.status(200).json(drivers);
  }
}