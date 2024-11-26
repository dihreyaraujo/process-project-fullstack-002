interface IRideEstimateOptions {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface IRideEstimate {
  origin: {
    latitude: number,
    longitude: number
  };
  destination: {
    latitude: number,
    longitude: number
  };
  distance: number;
  duration: string;
  options: IRideEstimateOptions[];
  routeResponse: {
    method: string;
    endpoint: string;
  }
}