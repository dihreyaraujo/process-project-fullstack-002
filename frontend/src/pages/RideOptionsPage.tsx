import { Component } from 'react';
import MapWithRoute from '../services/GoogleMapsComponent';


interface RideRequestPageProps {
  onStatusChange: (statusPage:string) => void;
}

class RideOptionsPage extends Component<RideRequestPageProps> {
  submitBtn = () => {
    this.props.onStatusChange('rideHistoric');
  }

  driverList = () => {
    const driversMock = [
      {
        id: 1,
        name: 'Homer',
        description: 'Muito atencioso e dirige bem com segurança',
        vehicle: 'Corolla',
        rating: '4.5',
        rate: 22.50
      },
      {
        id: 2,
        name: 'Cristiano',
        description: 'Bom no volante e muito simpático e carismático',
        vehicle: 'Civic',
        rating: '4.9',
        rate: 18.50
      },
      {
        id: 3,
        name: 'Alex',
        description: 'Deixo você no destino em tempo recorde',
        vehicle: 'Ônix',
        rating: '3.9',
        rate: 15.68
      },
      {
        id: 4,
        name: 'Roberto',
        description: 'Dirige com cuidado e ar-condicionado ligado',
        vehicle: 'Honda Fit',
        rating: '2.9',
        rate: 29.80
      }
    ]

    const driversElementHtml = driversMock.map((driver) => {
      return (
        <div className="driver-option">
          <h1 className="driver-info">{ driver.name }</h1>
          <p className="driver-info">Descrição: { driver.description }</p>
          <p className="driver-info">Veículo: { driver.vehicle }</p>
          <p className="driver-info">Avaliação: { driver.rating }</p>
          <p className="driver-info">R${ driver.rate.toFixed(2) }</p>
          <button type="submit" id={ driver.id.toString() } className="btn-choice-driver" onClick={this.submitBtn}>Escolher</button>
        </div>
      );
    });

    return driversElementHtml;
  }

  render () {
    return (
      <div className="drivers-container">
        { this.driverList() }
        <MapWithRoute />
      </div>
    );
  }
}

export default RideOptionsPage;
