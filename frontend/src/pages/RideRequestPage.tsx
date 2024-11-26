import { Component } from 'react';
import { rideRequestInfo } from '../services/callBackend';
import { IRideRequestPageProps } from '../interfaces/IRideRequestPageProps';
import { IRideEstimate } from '../interfaces/IRideEstimate';

class RideRequestPage extends Component<IRideRequestPageProps> {
  state = {
    customer_id: '',
    origin: '',
    destination: '',
    error: ''
  }

  submitBtn = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    try {
      const { customer_id, origin, destination } = this.state
      const responseRideOptions: IRideEstimate = await rideRequestInfo(customer_id, origin, destination);
      this.props.onStatusRideOptions?.({ ...responseRideOptions, customer_id, originName: origin, destinationName: destination });
      this.props.onStatusChange?.('rideOptions');
    } catch (err: any) {
      this.setState({ error: err.message });
    }
  }

  onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const stateField: string = target.id;
    this.setState({ [stateField]: target.value })
  }

  formRideRequest = (): JSX.Element => {
    const { customer_id, origin, destination, error } = this.state;
    return (
      <form id='request-form'>
        <label htmlFor='customer_id'>
          <p>Usuário:</p>
          <input type='text' id='customer_id' value={customer_id} onChange={this.onChangeInput} />
        </label>
        <label htmlFor='origin'>
          <p>Origem:</p>
          <input type='text' id='origin' value={origin} onChange={this.onChangeInput} />
        </label>
        <label htmlFor='destination'>
          <p>Destino:</p>
          <input type='text' id='destination' value={destination} onChange={this.onChangeInput} />
        </label>
        { error !== '' ? <p id='rideErrorMessage'>{error}</p> : '' }
        <label htmlFor='ride-request-button'>
          <button id='ride-request-button' type='submit' onClick={(event) => this.submitBtn(event)}>Calcular Viagem</button>
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
