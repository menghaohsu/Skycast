import React from 'react';
import { auth } from '../firebase';
import Header from './Header';

class Register extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confrimPassword: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { email, password, confrimPassword } = this.state;
    if (password !== confrimPassword) global.alert(`Password does not match the confirm password. `);
    else {
      auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.context.router.transitionTo('/');
      })
      .catch((error) => {
        global.alert(`Error: ${error.code}, Message: ${error.message}`);
      });
    }
  }

  handleInputChange (event) {
    const target = event.target;
    console.log(target);
    let name;
    if (target.type === 'email') name = 'email';
    else if (target.placeholder === 'Password') name = 'password';
    else name = 'confrimPassword';
    this.setState({[name]: target.value});
  }

  render () {
    return (
      <div className='register'>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className='registerDetails'>
            <input value={this.state.email} onChange={this.handleInputChange} type='email' placeholder='Email' /><br /><br />
            <input value={this.state.password} onChange={this.handleInputChange} type='password' placeholder='Password' /><br /><br />
            <input value={this.state.confrimPassword} onChange={this.handleInputChange} type='password' placeholder='Confrim Password' /><br />
          </div><br />
          <input className='btn btn-block btn-primary' type='submit' value='Register' id='submit' />
        </form>
      </div>
    );
  }
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Register;
