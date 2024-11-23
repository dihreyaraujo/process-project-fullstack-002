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
    page: 'rideRequest'
  }

  homePageBtn = () => {
    this.setState({ page: 'rideRequest' })
  }

  changePage = (statusPage: string) => {
    this.setState({ page: statusPage });
  }

  render() {
    const { page } = this.state;
    return (
      <div className="app">
        <header onClick={this.homePageBtn}>
          <img src={ TaxxerLogo } alt='taxiLogo' className='taxiLogo'/>
          <h1 id='taxxerH'>Taxxer</h1>
          <p id='taxxerSiteP'>.com.br</p>
        </header>
        { 
        page === 'rideRequest' 
        ? <RideRequestPage onStatusChange={ this.changePage } /> 
        : page === 'rideOptions' 
        ? <RideOptionsPage onStatusChange={ this.changePage } /> 
        : <RideHistoricPage onStatusChange={ this.changePage } /> }
      </div>
    );
  }
}

export default App;
