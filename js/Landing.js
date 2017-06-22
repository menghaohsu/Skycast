import React from 'react';
import { connect } from 'react-redux';
import { setSearchTerm } from './actionCreatetors';
import { auth } from '../firebase';
import SearchResult from './SearchResult';
import Header from './Header';

class Landing extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentUser: null,
      latitude: null,
      longitude: null,
      error: null
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount () {
    global.navigator.geolocation.getCurrentPosition((pos) => {
      if (!this.isUnmounted) {
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          error: null
        });
      }
    }, (error) => this.setState({ error: error.message }));
    auth.onAuthStateChanged((currentUser) => {
      if (!this.isUnmounted) this.setState({ currentUser });
    });
  }

  componentWillUnmount () {
    this.isUnmounted = true;
  }

  handleSearchTermChange (event) {
    this.props.dispatch(setSearchTerm(event.target.value));
  }

  handleSearchSubmit (event) {
    event.preventDefault();
    this.context.router.transitionTo({
      pathname: `/search`,
      query: {'searchTerm': this.props.searchTerm}
    });
  }

  render () {
    const { currentUser, latitude, longitude } = this.state;
    let currentWeather;
    if (latitude && longitude) {
      const location = {'lat': latitude, 'lng': longitude};
      currentWeather = <SearchResult location={location} />;
    } else currentWeather = <img className='loading' style={{ width: '15%' }} src='/public/img/loading.png' alt='loading indicator' />;

    return (
      <div>
        <Header />
        <div className='container marketing'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 search-block'>
              {currentUser && <img className='img-circle' src={currentUser.photoURL} alt={currentUser.displayName} width='140' height='140' />}
              {currentUser && <h3>Hi! {currentUser.displayName}</h3>}
              {!currentUser && <img className='img-circle' src='/public/img/blue-head.jpg' alt='Anonymous user' width='140' height='140' />}
              {!currentUser && <h3>Hi! Anonymous</h3>}
              <h2>Search Weather by Location</h2>
              <form onSubmit={this.handleSearchSubmit}><br />
                <input style={{ width: '65%' }} onChange={this.handleSearchTermChange} value={this.props.searchTerm} type='text' placeholder='Ex. New York' required />
              </form>
            </div>
            <div className='col-lg-6 col-md-5'>
              {currentWeather}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const { string, func, object } = React.PropTypes;

Landing.contextTypes = {
  router: object
};

Landing.propTypes = {
  searchTerm: string,
  dispatch: func,
  searchByTime: string
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(Landing);
