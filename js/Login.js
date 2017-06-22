import React from 'react';
import { Link } from 'react-router';
import { auth, googleAuthProvider, facebookAuthProvider, twitterAuthProvider, githubAuthProvider } from '../firebase';
import Header from './Header';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password)
    .then(() => this.context.router.transitionTo('/'))
    .catch((error) => {
      global.alert(`Error: ${error.code}, Message: ${error.message}`);
    });
  }

  handleInputChange (event) {
    const target = event.target;
    const name = target.type === 'email' ? 'email' : 'password';
    this.setState({[name]: target.value});
  }

  render () {
    return (
      <div className='login'>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className='loginDetails'>
            <input value={this.state.email} onChange={this.handleInputChange} type='email' placeholder='Email' /><br />
            <input value={this.state.password} onChange={this.handleInputChange} type='password' placeholder='Password' /><br />
          </div>
          <br />
          <input type='submit' className='btn btn-block btn-primary' value='login' />
          <Link className='btn btn-warning btn-block' to='/Register'>Register</Link>
        </form>
        <hr />
        <button className='btn btn-block btn-danger' onClick={() => {
          auth.signInWithPopup(googleAuthProvider)
          .then(() => {
            this.context.router.transitionTo('/');
          }).catch((error) => {
            console.log(error);
          });
        }}>
        Login with Google account
        </button>
        <button className='btn btn-block btn-success' onClick={() => {
          auth.signInWithPopup(twitterAuthProvider)
          .then(() => {
            this.context.router.transitionTo('/');
          }).catch((error) => {
            console.log(error);
          });
        }}>
        Login with Twitter account
        </button>
        <button className='btn btn-block btn-info' onClick={() => {
          auth.signInWithPopup(facebookAuthProvider)
          .then(() => {
            this.context.router.transitionTo('/');
          }).catch((error) => {
            console.log(error);
          });
        }}>
        Login with Facebook account
        </button>
        <button className='btn btn-block btn-default' onClick={() => {
          auth.signInWithPopup(githubAuthProvider)
          .then(() => {
            this.context.router.transitionTo('/');
          }).catch((error) => {
            console.log(error);
          });
        }}>
        Login with GitHub account
        </button>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;
