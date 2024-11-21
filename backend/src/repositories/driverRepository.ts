import Driver from '../models/Driver';

export class DriverRepository {
  static async getAllDrivers() {
    const allDrivers = await Driver.findAll();
    return allDrivers;
  }
  static async getDriverById(id: number) {
    const driver = await Driver.findOne({ where: { driver_id: id } });
    return driver;
  }
}

