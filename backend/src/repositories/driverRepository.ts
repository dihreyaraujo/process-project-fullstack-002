import Driver from '../models/Driver';

export class DriverRepository {
  static async getAllDrivers() {
    const allDrivers = await Driver.findAll({ raw: true });
    return allDrivers;
  }
  static async getDriverById(id: number) {
    const driver = await Driver.findOne({ where: { id }, raw: true });
    return driver;
  }
}

