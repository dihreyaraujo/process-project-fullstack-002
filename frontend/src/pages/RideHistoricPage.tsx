import { Component } from "react";
import { getDrivers, rideHistoric } from "../services/callBackend";
import { IRideRequestPageProps } from "../interfaces/IRideRequestPageProps";
import { IRideHistoricResponse } from "../interfaces/IRideHistoricResponse";
import { IDriver } from "../interfaces/IDriver";

class RideHistoricPage extends Component<IRideRequestPageProps> {

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

  onChangeDriver = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(({ driverFilter: target.value }));
  }

  applyFilterBtn = async (): Promise<void> => {
    try {
      const { customer_id } = this.state;
      const rideCustomerHistoric: IRideHistoricResponse = await rideHistoric(customer_id);
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

  customerIdInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ customer_id: target.value });
  }

  rideListFilter = async (): Promise<void> => {
    const drivers: IDriver[] = await getDrivers();
    const elementOptionsDrivers: JSX.Element[] = drivers.map((driver: IDriver) => {
      return (
        <option id={ driver.id.toString() }>{ driver.name }</option>
      )
    })
    const filterDrivers: JSX.Element = (
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

  createFormatDate = (date: string): string => {
    const nowDate = new Date(date);
    const day = nowDate.getDay();
    const month = nowDate.getMonth();
    const year = nowDate.getUTCFullYear();
    const hour = nowDate.getHours();
    const minute = nowDate.getMinutes();
    return `${day}/${month}/${year} - ${hour}:${minute}`; 
  }

  rideHistoricListByDriverName = (): void => {
    const { historicCustomerList, driverFilter }: any = this.state;
    const driverListFilter: IRideHistoricResponse[] = historicCustomerList.rides.filter((driver: IRideHistoricResponse) => driver.driver.name === driverFilter);
    const historicListElement: JSX.Element[] = driverListFilter.map((historic: IRideHistoricResponse) => {
      const historicHtml = (
        <div className="historic-container" key={historic.id}>
          <p className="historic-info"><strong>Data:</strong> { this.createFormatDate(historic.date.toString()) }</p>
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

  rideHistoricList = (): void => {
    const { historicCustomerList }: any = this.state;
    const historicListElement: JSX.Element[] = historicCustomerList.rides.map((historic: IRideHistoricResponse) => {
      const historicHtml = (
        <div className="historic-container" key={historic.id}>
          <p className="historic-info"><strong>Data:</strong> { this.createFormatDate(historic.date.toString()) }</p>
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
