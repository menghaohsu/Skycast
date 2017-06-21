import React from 'react';
import { connect } from 'react-redux';
import { setSearchTerm } from './actionCreatetors';
import { Link } from 'react-router';
import { auth } from '../firebase';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currentUser: null
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount () {
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
    const currentUser = this.state.currentUser;
    let utilSpace;
    if (this.props.showSearch) {
      utilSpace =
        <input
          className='form-control'
          onChange={this.handleSearchTermChange}
          value={this.props.searchTerm}
          type='text' placeholder='Search'
        />;
    }
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <Link to='/' className='navbar-brand' >Skycast</Link>
          </div>
          <div id='navbar' className='navbar-collapse collapse'>
            <ul className='nav navbar-nav navbar-right'>
              <li className='active'><Link to='/'>Home</Link></li>
              {!currentUser && <li><Link to='/login'>Login</Link></li>}
              {currentUser && <li><Link to='/' onClick={() => auth.signOut()}>Logout</Link></li>}
              {!currentUser && <li><Link to='/register'>Register</Link></li>}
              {currentUser && <li><Link to={{
                pathname: `/searchHistory/`,
                query: {user: JSON.stringify(currentUser)}
              }}>Search history</Link></li>}
            </ul>
            <form onSubmit={this.handleSearchSubmit} className='navbar-form navbar-right custon-form'>
              {utilSpace}
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

const { func, bool, string, object } = React.PropTypes;

Header.propTypes = {
  dispatch: func,
  showSearch: bool,
  searchTerm: string
};

Header.contextTypes = {
  router: object.isRequired
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

export default connect(mapStateToProps)(Header);
