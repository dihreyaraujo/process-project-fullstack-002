import axios from 'axios';

export const calculateRoute = async (origin: string, destination: string) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
  );

  const data = response.data.routes[0];
  const infoRoute = {
    distance: data.legs[0].distance.value / 1000,
    duration: data.legs[0].duration.text,
    startLocation: {
      latitude: data.legs[0].start_location.lat,
      longitude: data.legs[0].start_location.lng,
    },
    endLocation: {
      latitude: data.legs[0].end_location.lat,
      longitude: data.legs[0].end_location.lng,
    }
  };
  return infoRoute;
};
