import React from 'react';
import { connect } from 'react-redux';
import { database } from '../firebase';
import { setSearchTerm } from './actionCreatetors';
import Header from './Header';
import map from 'lodash/map';
const { shape, string, object, func } = React.PropTypes;

const SearchHistory = React.createClass({
  contextTypes: {
    router: object
  },
  propTypes: {
    location: shape({
      query: shape({
        user: string
      })
    }),
    searchTerm: string,
    dispatch: func
  },
  getInitialState () {
    let q = this.props.location.query.user;
    if (typeof q === 'string') q = JSON.parse(q);

    return {
      searchHistoryRef: database.ref(`/allSearchHistory/${q.uid}/userSearchHistory`),
      currentUser: q,
      searchHistory: {}
    };
  },
  componentDidMount () {
    this.state.searchHistoryRef.on('value', (snapshot) => {
      this.setState({ searchHistory: snapshot.val() });
    });
  },
  handleSearchSubmit (event) {
    event.preventDefault();
    this.props.dispatch(setSearchTerm(event.target.value));
    this.context.router.transitionTo({
      pathname: `/search`,
      query: {'searchTerm': event.target.value}
    });
  },
  render () {
    const { searchHistory } = this.state;
    return (
      <div className='searchHistory'>
        <Header />
        { map(searchHistory, (value, key) => <div key={key}><button className='searchHistoryBtn' onClick={this.handleSearchSubmit} value={value}>{value}</button><br /></div>)}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(SearchHistory);
