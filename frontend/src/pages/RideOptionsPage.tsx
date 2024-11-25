import { Component } from 'react';
import MapPage from '../googleMaps';
import { choiceDriver } from '../services/callBackend';

interface RideRequestPageProps {
  onStatusChange: (statusPage: string) => void;
  driversOption: () => any;
}

class RideOptionsPage extends Component<RideRequestPageProps> {
  submitBtn = async ({ target }: any) => {
    const ridesInfo = this.props.driversOption();
    const driverChoice = {
      customer_id: ridesInfo.customer_id,
      origin: ridesInfo.origin,
      destination: ridesInfo.destination,
      distance: ridesInfo.distance,
      driver: {
        id: target.id,
        name: ridesInfo.options.filter((driver: any) => driver.id === Number(target.id))
      },
      value: ridesInfo.value
    };
    await choiceDriver(driverChoice);
    this.props.onStatusChange('rideHistoric');
  }

  driverList = () => {
    const drivers = this.props.driversOption().options;

    const driversElementHtml = drivers.map((driver: any) => {
      return (
        <div className="driver-option" key={driver.id}>
          <h1 className="driver-info">{driver.name}</h1>
          <p className="driver-info">Descrição: {driver.description}</p>
          <p className="driver-info">Veículo: {driver.vehicle}</p>
          <p className="driver-info">Avaliação: {driver.review.rating}</p>
          <p className="driver-info">R${driver.value}</p>
          <button type="button" id={driver.id.toString()} className="btn-choice-driver" onClick={(event) => this.submitBtn(event)}>Escolher</button>
        </div>
      );
    });

    return driversElementHtml;
  }

  coordenadas = {
    origin: { 
      lat: this.props.driversOption().origin.latitude,
      lng: this.props.driversOption().origin.longitude 
    },
    destination: { 
      lat: this.props.driversOption().destination.latitude,
      lng: this.props.driversOption().destination.longitude
    }
  }

  render() {
    return (
      <div className="drivers-container">
        <div className='drivers-info'>
          {this.driverList()}
        </div>
        <MapPage origin={this.coordenadas.origin} destination={this.coordenadas.destination} />
      </div>
    );
  }
}

export default RideOptionsPage;
