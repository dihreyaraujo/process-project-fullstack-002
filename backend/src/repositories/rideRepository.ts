import Ride from '../models/Ride';

export class RideRepository {
  static async saveRide(ride: any) {
    await Ride.create(ride);
  };

  static async getRidesByCustomer(customer_id: string) {
    const rides = await Ride.findAll({ where: { customer_id } });
    return rides;
  };

}
