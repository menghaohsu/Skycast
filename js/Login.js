import React from 'react';
import { Link } from 'react-router';
import { auth, googleAuthProvider } from '../firebase';
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
            Email:
            <input value={this.state.email} onChange={this.handleInputChange} type='email' placeholder='Email' /><br />
            Password:
            <input value={this.state.password} onChange={this.handleInputChange} type='password' placeholder='Password' /><br />
          </div>
          <input type='submit' value='Login' className='submitBtn' id='submit' />
        </form>
        <Link to='/Register'>Register</Link><br />
        <button className='googleBtn' onClick={() => {
          auth.signInWithPopup(googleAuthProvider)
          .then(() => {
            this.context.router.transitionTo('/');
          }).catch((error) => {
            console.log(error);
          });
        }}>
        Login with Google account
        </button>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;
