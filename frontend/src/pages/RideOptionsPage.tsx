import { Component } from 'react';
import MapPage from '../services/googleMaps';
import { choiceDriver } from '../services/callBackend';
import { IRideRequestPageProps } from '../interfaces/IRideRequestPageProps';
import { IRideEstimateOptions } from '../interfaces/IRideEstimate';

class RideOptionsPage extends Component<IRideRequestPageProps> {
  state = {
    errorMessage: ''
  }


  submitBtn = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      const target = event.target as HTMLButtonElement;
      const ridesInfo = this.props.driversOption?.();
      const driverChoice = {
        customer_id: ridesInfo.customer_id,
        origin: ridesInfo.originName,
        destination: ridesInfo.destinationName,
        distance: ridesInfo.distance,
        duration: ridesInfo.duration,
        driver: {
          id: Number(target.id),
          name: ridesInfo.options.find((driver: any) => driver.id === Number(target.id)).name
        },
        value: ridesInfo.options.find((driver: any) => driver.id === Number(target.id)).value
      };
      await choiceDriver(driverChoice);
      this.props.onStatusChange?.('rideHistoric');
    } catch (err: any) {
      this.setState({ errorMessage: err.message })
    }
  }

  driverList = () => {
    const drivers: IRideEstimateOptions[] = this.props.driversOption?.().options;

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
      lat: this.props.driversOption?.().origin.latitude,
      lng: this.props.driversOption?.().origin.longitude 
    },
    destination: { 
      lat: this.props.driversOption?.().destination.latitude,
      lng: this.props.driversOption?.().destination.longitude
    }
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="drivers-container">
        <div className='drivers-info'>
          {this.driverList()}
        </div>
        { errorMessage !== '' ? <p id='rideErrorMessage'>{errorMessage}</p> : '' }
        <MapPage origin={this.coordenadas.origin} destination={this.coordenadas.destination} />
      </div>
    );
  }
}

export default RideOptionsPage;
