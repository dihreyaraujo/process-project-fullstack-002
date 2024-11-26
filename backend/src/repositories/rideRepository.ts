import Ride from '../models/Ride';

export class RideRepository {
  static async saveRide(ride: any): Promise<void> {
    await Ride.create(ride, { raw: true });
  };

  static async getRidesByCustomer(customer_id: string): Promise<IRide[]> {
    const rides: IRide[] = await Ride.findAll({ where: { customer_id }, raw: true });
    return rides;
  };

}
