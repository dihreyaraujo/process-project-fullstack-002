import { Component } from "react";

interface RideRequestPageProps {
  onStatusChange: (statusPage:string) => void;
}

class RideHistoricPage extends Component<RideRequestPageProps> {

  mockHistoric = [
    {
      date: '22/11/2024 - 11:40',
      driver_name: 'Homer',
      origin: 'Rua São Paulo',
      destination: 'Rua Uberlândia',
      distance: '9km',
      duration: '20min',
      value: '34.50'
    },
    {
      date: '19/08/2024 - 13:30',
      driver_name: 'Cristiano',
      origin: 'Rua Rio de Janeiro',
      destination: 'Rua Copacabana',
      distance: '14km',
      duration: '35min',
      value: '43.50'
    },
    {
      date: '01/09/2024 - 07:50',
      driver_name: 'Messi',
      origin: 'Rua Minas Gerais',
      destination: 'Rua Belo Horizonte',
      distance: '5km',
      duration: '10min',
      value: '18.95'
    },
    {
      date: '24/12/2024 - 19:30',
      driver_name: 'Alex',
      origin: 'Rua Vr',
      destination: 'Rua Va',
      distance: '7km',
      duration: '13min',
      value: '24.80'
    },
  ]

  state = {
    historicCostumerList: this.mockHistoric,
    historicFilter: [],
    driverFilter: 'Todos'
  }

  onChangeDriver = ({ target }: any) => {
    this.setState(({ driverFilter: target.value }));
  }

  applyFilterBtn = () => {
    const { driverFilter } = this.state;
    if (driverFilter !== 'Todos') {
      this.rideHistoricListByDriverName();
    } else {
      this.rideHistoricList();
    }
  }

  rideListFilter = () => {
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
    ];
    const elementOptionsDrivers = driversMock.map((driver: any) => {
      return (
        <option id={ driver.id }>{ driver.name }</option>
      )
    })
    return (
      <form className="historic-form">
        <label htmlFor="userid-input">
          <p>Usuário:</p>
          <input type="text" id="userid-input-historic"/>
        </label>
        <select onChange={(event) => this.onChangeDriver(event)}>
          <option>Todos</option>
          { elementOptionsDrivers }
        </select>
        <button type="button" className="filter-btn" onClick={this.applyFilterBtn}>Aplicar</button>
      </form>
    )
  }

  rideHistoricListByDriverName = () => {
    const { historicCostumerList, driverFilter } = this.state;
    const driverListFilter = historicCostumerList.filter((driver) => driver.driver_name === driverFilter);
    const historicListElement = driverListFilter.map((historic: any) => {
      const historicHtml = (
        <div className="historic-container">
          <p className="historic-info"><strong>Data:</strong> { historic.date }</p>
          <p className="historic-info"><strong>Motorista:</strong> { historic.driver_name }</p>
          <p className="historic-info"><strong>Origem:</strong> { historic.origin }</p>
          <p className="historic-info"><strong>Destino:</strong> { historic.destination }</p>
          <p className="historic-info"><strong>Distância:</strong> { historic.distance }</p>
          <p className="historic-info"><strong>Duração:</strong> { historic.duration }</p>
          <p className="historic-info"><strong>Valor:</strong> R${ historic.value }</p>
        </div>
      );
      return historicHtml;
    });
    this.setState({ historicFilter: historicListElement });
  }

  rideHistoricList = () => {
    const { historicCostumerList } = this.state;
    const historicListElement = historicCostumerList.map((historic: any) => {
      const historicHtml = (
        <div className="historic-container">
          <p className="historic-info"><strong>Data:</strong> { historic.date }</p>
          <p className="historic-info"><strong>Motorista:</strong> { historic.driver_name }</p>
          <p className="historic-info"><strong>Origem:</strong> { historic.origin }</p>
          <p className="historic-info"><strong>Destino:</strong> { historic.destination }</p>
          <p className="historic-info"><strong>Distância:</strong> { historic.distance }</p>
          <p className="historic-info"><strong>Duração:</strong> { historic.duration }</p>
          <p className="historic-info"><strong>Valor:</strong> R${ historic.value }</p>
        </div>
      );
      return historicHtml;
    });
    this.setState({ historicFilter: historicListElement });;
  }

  render () {
    const { historicFilter } = this.state;
    return (
      <div>
        { this.rideListFilter() }
        <div className="historic-customer-container">
          { historicFilter }
        </div>
      </div>
    )
  }
}

export default RideHistoricPage;
