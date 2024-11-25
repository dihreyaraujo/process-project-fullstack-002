import { Component } from 'react';
import RideHistoricPage from './pages/RideHistoricPage';
import RideOptionsPage from './pages/RideOptionsPage';
import RideRequestPage from './pages/RideRequestPage';
import TaxxerLogo from './images/taxxer-logo.png'
import './style/App.css';
import './style/RideRequest.css';
import './style/RideOptions.css';
import './style/RideHistoric.css';

class App extends Component {
  state = {
    page: 'rideRequest',
    rideOptions: {}
  }

  homePageBtn = () => {
    this.setState({ page: 'rideRequest' })
  }

  changePage = (statusPage: string) => {
    this.setState({ page: statusPage });
  }

  rideOptionsEstimate = (rideOptions: object) => {
    this.setState({ rideOptions });
  }

  render() {
    const { page } = this.state;
    return (
      <div className="app">
        <header>
          <img src={ TaxxerLogo } alt='taxiLogo' className='taxiLogo' onClick={this.homePageBtn}/>
          <h1 id='taxxerH' onClick={this.homePageBtn}>Taxxer</h1>
          <p id='taxxerSiteP' onClick={this.homePageBtn}>.com.br</p>
        </header>
        { 
        page === 'rideRequest' 
        ? <RideRequestPage onStatusChange={ this.changePage } onStatusRideOptions={this.rideOptionsEstimate} /> 
        : page === 'rideOptions' 
        ? <RideOptionsPage onStatusChange={ this.changePage } driversOption={ () => this.state.rideOptions } /> 
        : <RideHistoricPage onStatusChange={ this.changePage } /> }
      </div>
    );
  }
}

export default App;
