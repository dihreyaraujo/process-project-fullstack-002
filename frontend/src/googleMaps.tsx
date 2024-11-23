import { Component } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";

interface MapPageProps {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
}

interface MapPageState {
  response: google.maps.DirectionsResult | null;
}

class MapPage extends Component<MapPageProps, MapPageState> {
  constructor(props: MapPageProps) {
    super(props);
    this.state = {
      response: null
    };
  }

  directionsCallback = (
    res: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK" && res !== null) {
      this.setState({ response: res });
    } else {
      console.error(`Directions request failed due to ${status}`);
    }
  };

  render() {
    const { origin, destination } = this.props;
    const { response } = this.state;

    const directionsServiceOptions: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    const directionsRendererOptions = {
      directions: response,
    };

    return (
      <div className="map">
        <GoogleMap
          mapContainerStyle={{ width: "50vw", height: "50vh", margin: "20px 25vw 5px 25vw" }}
          zoom={15}
        >
          <DirectionsService
            options={directionsServiceOptions}
            callback={this.directionsCallback}
          />
          {response && (
            <DirectionsRenderer options={directionsRendererOptions} />
          )}
        </GoogleMap>
      </div>
    );
  }
}

export default MapPage;
