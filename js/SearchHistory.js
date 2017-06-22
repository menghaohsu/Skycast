import React from 'react';
import { connect } from 'react-redux';
import { database } from '../firebase';
import { setSearchTerm } from './actionCreatetors';
import Header from './Header';
import map from 'lodash/map';

class SearchHistory extends React.Component {
  constructor (props) {
    super(props);

    let q = this.props.location.query.user;
    if (typeof q === 'string') q = JSON.parse(q);

    this.state = {
      searchHistoryRef: database.ref(`/allSearchHistory/${q.uid}/userSearchHistory`),
      currentUser: q,
      searchHistory: {}
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount () {
    this.state.searchHistoryRef.on('value', (snapshot) => {
      this.setState({ searchHistory: snapshot.val() });
    });
  }

  handleSearchSubmit (event) {
    event.preventDefault();
    this.props.dispatch(setSearchTerm(event.target.value));
    this.context.router.transitionTo({
      pathname: `/search`,
      query: {'searchTerm': event.target.value}
    });
  }

  render () {
    const { searchHistory } = this.state;
    return (
      <div className='searchHistory'>
        <Header />
        { map(searchHistory, (value, key) => <div key={key}><button className='btn btn-success btn-block' onClick={this.handleSearchSubmit} value={value}>{value}</button><br /></div>)}
      </div>
    );
  }
}

const { shape, string, object, func } = React.PropTypes;

SearchHistory.contextTypes = {
  router: object
};

SearchHistory.propTypes = {
  location: shape({
    query: shape({
      user: string
    })
  }),
  searchTerm: string,
  dispatch: func
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(SearchHistory);
