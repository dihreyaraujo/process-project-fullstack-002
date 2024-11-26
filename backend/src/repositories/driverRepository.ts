import Driver from '../models/Driver';

export class DriverRepository {
  static async getAllDrivers(): Promise<IDriver[]> {
    const allDrivers: IDriver[] = await Driver.findAll({ raw: true });
    return allDrivers;
  }
  static async getDriverById(id: number): Promise<IDriver | null> {
    const driver: IDriver | null = await Driver.findOne({ where: { id }, raw: true });
    return driver;
  }
}

