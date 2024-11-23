import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const MapElement = () => (
  <APIProvider apiKey="AIzaSyDbWbacaflKWNogFNNtksDC59wCraBTq3Y">
    <Map
      style={{width: '50vw', height: '50vh', margin: '20px 25vw 5px 25vw'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      id='mapGoogle'
    />
  </APIProvider>
);

export default MapElement