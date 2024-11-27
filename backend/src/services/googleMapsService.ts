import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const calculateRoute = async (origin: string, destination: string) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const response = await axios.post(
    `https://routes.googleapis.com/directions/v2:computeRoutes?key=${apiKey}`, {
      origin: {
        address: origin
      },
      destination: {
        address: destination
      },
      travelMode: 'DRIVE',
      languageCode: 'pt-BR',
    }, {
      headers: {
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation',
        'Content-Type': 'application/json'
      }
    }
  );

  const data = response.data.routes[0];
  const infoRoute = {
    distance: data.distanceMeters,
    duration: data.duration,
    startLocation: {
      latitude: data.legs[0].startLocation.latLng.latitude,
      longitude: data.legs[0].startLocation.latLng.longitude,
    },
    endLocation: {
      latitude: data.legs[0].endLocation.latLng.latitude,
      longitude: data.legs[0].endLocation.latLng.longitude,
    }
  };
  return { infoRoute, routeResponse: response.data };
};
