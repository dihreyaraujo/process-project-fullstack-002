export interface IRideRequestPageProps {
  onStatusChange?: (statusPage:string) => void;
  driversOption?: () => any;
  onStatusRideOptions?: (rideOptions: object) => void;
}