import { Component } from 'react';

interface RideRequestPageProps {
  onStatusChange: (statusPage:string) => void;
}

class RideRequestPage extends Component<RideRequestPageProps> {

  submitBtn = () => {
    this.props.onStatusChange('rideOptions');
  }

  formRideRequest = () => {
    return (
      <form id='request-form'>
        <label htmlFor='id-user-input'>
          <p>Usuário:</p>
          <input type='text' id='id-user' />
        </label>
        <label htmlFor='origin-input'>
          <p>Origem:</p>
          <input type='text' id='origin-input' />
        </label>
        <label htmlFor='destination-input'>
          <p>Destino:</p>
          <input type='text' id='destination-input' />
        </label>
        <label htmlFor='ride-request-button'>
          <button id='ride-request-button' type='submit' onClick={this.submitBtn}>Calcular Viagem</button>
        </label>
      </form>
    );
  }

  render() {
    return (
      <div>
        { this.formRideRequest() }
      </div>
    )
  }
}

export default RideRequestPage;
