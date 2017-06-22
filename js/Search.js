import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { auth, database } from '../firebase';
import Header from './Header';
import ShowCard from './ShowCard';
import { setSearchTerm, resetSearchStatus } from './actionCreatetors';

const { string, shape, func, bool } = React.PropTypes;

const Search = React.createClass({
  propTypes: {
    location: shape({
      query: shape({
        searchTerm: string
      })
    }),
    dispatch: func,
    searchTerm: string,
    isSubmitted: bool
  },
  getInitialState () {
    return {
      googleMapData: {},
      currentUser: null
    };
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.isSubmitted) {
      nextProps.dispatch(resetSearchStatus());

      axios.get(`/getLocation/${this.props.searchTerm}`)
        .then((response) => {
          this.setState({googleMapData: response.data});
        })
        .then(() => {
          auth.onAuthStateChanged((currentUser) => {
            this.setState({ currentUser });
          });
        })
        .then(() => {
          if (this.state.currentUser) {
            database.ref(`/allSearchHistory/${this.state.currentUser.uid}/userSearchHistory`).once('value')
            .then((snapshot) => {
              let exist = false;
              map(snapshot.val(), (value, key) => {
                if (value === this.state.googleMapData.results[0].formatted_address) {
                  exist = true;
                }
              });
              return exist;
            }).then((exist) => {
              if (!exist) {
                database.ref(`/allSearchHistory/${this.state.currentUser.uid}/userSearchHistory`)
                .push(this.state.googleMapData.results[0].formatted_address)
                .catch((error) => console.log(error));
              }
            });
          }
        })
        .catch((error) => console.error('axios error', error));
    }
  },
  componentDidMount () {
    this.props.dispatch(setSearchTerm(this.props.location.query.searchTerm));

    axios.get(`/getLocation/${this.props.location.query.searchTerm}`)
      .then((response) => {
        this.setState({googleMapData: response.data});
      })
      .then(() => {
        auth.onAuthStateChanged((currentUser) => {
          this.setState({ currentUser });
        });
      })
      .then(() => {
        if (this.state.currentUser) {
          database.ref(`/allSearchHistory/${this.state.currentUser.uid}/userSearchHistory`).once('value')
          .then((snapshot) => {
            let exist = false;
            map(snapshot.val(), (value, key) => {
              if (value === this.state.googleMapData.results[0].formatted_address) {
                exist = true;
              }
            });
            return exist;
          }).then((exist) => {
            if (!exist) {
              database.ref(`/allSearchHistory/${this.state.currentUser.uid}/userSearchHistory`)
              .push(this.state.googleMapData.results[0].formatted_address)
              .catch((error) => console.log(error));
            }
          });
        }
      })
      .catch((error) => console.error('axios error', error));
  },
  render () {
    let geometry;

    if (this.state.googleMapData.results) {
      geometry =
        <div>
          <h1>{this.props.location.query.searchTerm.toUpperCase()}</h1>
          <ShowCard location={this.state.googleMapData.results[0].geometry.location} isSubmitted={this.props.isSubmitted} />
        </div>;
    } else {
      geometry = <img style={{ width: '15%' }} src='/public/img/loading.png' alt='loading indicator' />;
    }
    return (
      <div className='search'>
        <Header showSearch />
        <div className='showWeatherResult'>
          {geometry}
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    isSubmitted: state.isSubmitted
  };
};

export default connect(mapStateToProps)(Search);
