import { Component } from "react";
import { getDrivers, rideHistoric } from "../services/callBackend";
import { driversMock } from "../mocks/driversMock";

interface RideRequestPageProps {
  onStatusChange: (statusPage:string) => void;
}

class RideHistoricPage extends Component<RideRequestPageProps> {

  state = {
    historicCustomerList: [],
    historicFilter: [],
    driverFilter: 'Todos',
    customer_id: '',
    errorMessage: '',
    formFilter: ''
  }

  async componentDidMount(): Promise<void> {
    await this.rideListFilter()
  }

  onChangeDriver = ({ target }: any) => {
    this.setState(({ driverFilter: target.value }));
  }

  applyFilterBtn = async () => {
    try {
      const { customer_id } = this.state;
      const rideCustomerHistoric = await rideHistoric(customer_id);
      this.setState({ historicCustomerList: rideCustomerHistoric }, () => {
        const { driverFilter } = this.state;
        if (driverFilter !== 'Todos') {
          this.rideHistoricListByDriverName();
        } else {
          this.rideHistoricList();
        }
      });
      if (this.state.errorMessage !== "") {
        this.setState({ errorMessage: '' });
      }
    } catch (err: any) {
      this.setState({ errorMessage: err.message });
    }
  }

  customerIdInputChange = ({ target }: any) => {
    this.setState({ customer_id: target.value });
  }

  rideListFilter = async () => {
    const drivers = await getDrivers();
    const elementOptionsDrivers = drivers.map((driver: any) => {
      return (
        <option id={ driver.id }>{ driver.name }</option>
      )
    })
    const filterDrivers = (
      <form className="historic-form">
        <label htmlFor="userid-input">
          <p>Usuário:</p>
          <input type="text" id="userid-input-historic" onChange={(event) => this.customerIdInputChange(event)}/>
        </label>
        <select onChange={(event) => this.onChangeDriver(event)}>
          <option>Todos</option>
          { elementOptionsDrivers }
        </select>
        <button type="button" className="filter-btn" onClick={this.applyFilterBtn}>Aplicar</button>
      </form>
    )
    this.setState({ formFilter: filterDrivers });
  }

  createFormatDate = (date: string) => {
    const nowDate = new Date(date);
    const day = nowDate.getDay();
    const month = nowDate.getMonth();
    const year = nowDate.getUTCFullYear();
    const hour = nowDate.getHours();
    const minute = nowDate.getMinutes();
    return `${day}/${month}/${year} - ${hour}:${minute}`; 
  }

  rideHistoricListByDriverName = () => {
    const { historicCustomerList, driverFilter }: any = this.state;
    const driverListFilter = historicCustomerList.rides.filter((driver: any) => driver.driver.name === driverFilter);
    const historicListElement = driverListFilter.map((historic: any) => {
      const historicHtml = (
        <div className="historic-container" key={historic.id}>
          <p className="historic-info"><strong>Data:</strong> { this.createFormatDate(historic.date) }</p>
          <p className="historic-info"><strong>Motorista:</strong> { historic.driver.name}</p>
          <p className="historic-info"><strong>Origem:</strong> { historic.origin }</p>
          <p className="historic-info"><strong>Destino:</strong> { historic.destination }</p>
          <p className="historic-info"><strong>Distância:</strong> { historic.distance.toFixed(2) }km</p>
          <p className="historic-info"><strong>Duração:</strong> { Number(historic.duration).toFixed(0) } minutos</p>
          <p className="historic-info"><strong>Valor:</strong> R${ historic.value }</p>
        </div>
      );
      return historicHtml;
    });
    this.setState({ historicFilter: historicListElement });
  }

  rideHistoricList = () => {
    const { historicCustomerList }: any = this.state;
    console.log('RIDES: ', historicCustomerList.rides);
    const historicListElement = historicCustomerList.rides.map((historic: any) => {
      const historicHtml = (
        <div className="historic-container" key={historic.id}>
          <p className="historic-info"><strong>Data:</strong> { this.createFormatDate(historic.date) }</p>
          <p className="historic-info"><strong>Motorista:</strong> { historic.driver.name}</p>
          <p className="historic-info"><strong>Origem:</strong> { historic.origin }</p>
          <p className="historic-info"><strong>Destino:</strong> { historic.destination }</p>
          <p className="historic-info"><strong>Distância:</strong> { historic.distance.toFixed(2) }km</p>
          <p className="historic-info"><strong>Duração:</strong> { Number(historic.duration).toFixed(0) } minutos</p>
          <p className="historic-info"><strong>Valor:</strong> R${ historic.value }</p>
        </div>
      );
      return historicHtml;
    });
    this.setState({ historicFilter: historicListElement });;
  }

  render () {
    const { historicFilter, errorMessage, formFilter } = this.state;
    return (
      <div>
        { formFilter }
        { errorMessage !== '' ? <p style={{ margin: "0 0 0 50px" }} id="rideErrorMessage">{errorMessage}</p> : '' }
        <div className="historic-customer-container">
          { errorMessage === "" && historicFilter }
        </div>
      </div>
    )
  }
}

export default RideHistoricPage;
