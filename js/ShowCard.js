import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const { shape, number } = React.PropTypes;

const ShowCard = React.createClass({
  propTypes: {
    location: shape({
      lat: number,
      lng: number
    })
  },
  getInitialState () {
    return {
      weatherData: {},
      hourlyOrWeekly: true,
      originalData: true
    };
  },
  componentDidMount () {
    if (this.props.location) {
      axios.get(`/getWeather/${this.props.location.lat}/${this.props.location.lng}`)
        .then((response) => {
          this.setState({weatherData: response.data});
        })
        .catch((error) => console.error('axios error', error));
    }
  },
  imageFormatter (cell) {
    return (<img style={{width: 50}} src={cell} />);
  },
  transfer () {
    this.setState({hourlyOrWeekly: !this.state.hourlyOrWeekly});
    this.setState({originalData: false});
  },
  render () {
    let weather;
    if (this.state.weatherData.timezone) {
      const data = [];
      if (this.state.hourlyOrWeekly) {
        this.state.weatherData.hourly.data.map((row, i) => {
          if (i % 3 === 0 && i <= 21) {
            let cur = Object.create(row);
            data.push(cur);
          }
        });
        data.map((row, i) => {
          row.image = `/public/img/${row.icon}.png`;
          row.temperature += 'F';
          row.cloudCover = Math.floor(row.cloudCover * 100) + '%';
          row.humidity = Math.floor(row.humidity * 100) + '%';
          row.time = new Date(row.time *= 1000);
        });
      } else {
        this.state.weatherData.daily.data.map((row, i) => {
          let cur = Object.create(row);
          data.push(cur);
        });
        data.map((row, i) => {
          row.temperature = row.apparentTemperatureMin.toString() + ' - ' + row.apparentTemperatureMax;
          row.image = `/public/img/${row.icon}.png`;
          row.time = new Date(row.time *= 1000);
          row.temperature += 'F';
          row.cloudCover = Math.floor(row.cloudCover * 100) + '%';
          row.humidity = Math.floor(row.humidity * 100) + '%';
        });
      }
      weather =
        <div>
          <BootstrapTable data={data} striped hover>
            <TableHeaderColumn dataField='image' dataFormat={this.imageFormatter}>Weather</TableHeaderColumn>
            <TableHeaderColumn dataField='cloudCover'>Cloud Cover</TableHeaderColumn>
            <TableHeaderColumn isKey dataField='time'>Time</TableHeaderColumn>
            <TableHeaderColumn dataField='humidity'>Humidity</TableHeaderColumn>
            <TableHeaderColumn dataField='temperature'>Tempertature</TableHeaderColumn>
          </BootstrapTable>
          {this.state.hourlyOrWeekly && <button className='transferBtn' onClick={this.transfer}>Weekly report</button>}
          {!this.state.hourlyOrWeekly && <button className='transferBtn' onClick={this.transfer}>Daily report</button>}
        </div>;
    } else {
      weather = <img style={{ width: '15%' }} src='/public/img/loading.png' alt='loading indicator' />;
    }
    return (
      <div className='show-card'>
        <section>
          {weather}
        </section>
      </div>
    );
  }
});

export default ShowCard;
