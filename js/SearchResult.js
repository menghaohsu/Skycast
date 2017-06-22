import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class SearchResult extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      weatherData: {},
      hourlyOrWeekly: true,
      originalData: true
    };

    this.transfer = this.transfer.bind(this);
    this.imageFormatter = this.imageFormatter.bind(this);
  }

  componentWillReceiveProps () {
    if (this.props.location && this.props.isSubmitted) {
      axios.get(`/getWeather/${this.props.location.lat}/${this.props.location.lng}`)
        .then((response) => {
          this.setState({weatherData: response.data});
        })
        .catch((error) => console.error('axios error', error));
    }
  }

  componentDidMount () {
    if (this.props.location) {
      axios.get(`/getWeather/${this.props.location.lat}/${this.props.location.lng}`)
        .then((response) => {
          this.setState({weatherData: response.data});
        })
        .catch((error) => console.error('axios error', error));
    }
  }

  imageFormatter (cell) {
    return (<img style={{width: 50}} src={cell} />);
  }

  transfer () {
    this.setState({hourlyOrWeekly: !this.state.hourlyOrWeekly});
    this.setState({originalData: false});
  }

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
          row.temperature = `${Math.floor(row.temperature)}F`;
          row.cloudCover = Math.floor(row.cloudCover * 100) + '%';
          row.humidity = Math.floor(row.humidity * 100) + '%';
          row.time = `${new Date(row.time * 1000).getHours()}:00`;
        });
      } else {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.state.weatherData.daily.data.map((row, i) => {
          let cur = Object.create(row);
          data.push(cur);
        });
        data.map((row, i) => {
          row.temperature = `${Math.floor(row.apparentTemperatureMin)} - ${Math.floor(row.apparentTemperatureMax)}F`;
          row.image = `/public/img/${row.icon}.png`;
          row.time = `${monthNames[new Date(row.time * 1000).getMonth()]} ${new Date(row.time * 1000).getDate()}`;
          row.cloudCover = Math.floor(row.cloudCover * 100) + '%';
          row.humidity = Math.floor(row.humidity * 100) + '%';
        });
      }
      weather =
        <div>
          <br />
          {this.state.hourlyOrWeekly && <div className='swtich'><h3>Daily Report</h3><button className='btn btn-primary switchBtn' onClick={this.transfer}>Switch to weekly</button></div>}
          {!this.state.hourlyOrWeekly && <div className='swtich'><h3>Weekly Report</h3><button className='btn btn-primary switchBtn' onClick={this.transfer}>Switch to daily</button></div>}
          <BootstrapTable data={data} striped hover>
            <TableHeaderColumn dataField='image' dataAlign='center' dataFormat={this.imageFormatter} width='10'>Weather</TableHeaderColumn>
            <TableHeaderColumn dataField='cloudCover' dataAlign='center' width='100'>Cloud Cover</TableHeaderColumn>
            <TableHeaderColumn isKey dataField='time' dataAlign='center' width='100'>Time</TableHeaderColumn>
            <TableHeaderColumn dataField='humidity' dataAlign='center' width='100'>Humidity</TableHeaderColumn>
            <TableHeaderColumn dataField='temperature' dataAlign='center' width='100'>Tempertature</TableHeaderColumn>
          </BootstrapTable>
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
}

const { shape, number, bool, string } = React.PropTypes;

SearchResult.propTypes = {
  location: shape({
    lat: number,
    lng: number
  }),
  isSubmitted: bool,
  searchTerm: string
};

export default SearchResult;
