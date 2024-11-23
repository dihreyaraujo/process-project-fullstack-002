import React, { Component } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

class MapWithRoute extends Component {
  state = {
    directions: null,
  };

  directionsCallback = (response: any) => {
    if (response?.status === "OK") {
      this.setState({ directions: response });
    }
  };

  render() {
    const { directions } = this.state;
    return (
      <LoadScript googleMapsApiKey="AIzaSyDbWbacaflKWNogFNNtksDC59wCraBTq3Y">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: -23.55052, lng: -46.633308 }}
          zoom={12}
        >
          <DirectionsService
            options={{
              origin: "São Paulo, SP",
              destination: "Rio de Janeiro, RJ",
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={this.directionsCallback}
          />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapWithRoute;
