export interface IRideHistoricResponse {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface IHistoricResponse {
  customer_id: string;
  rides: IRideHistoricResponse[]
}