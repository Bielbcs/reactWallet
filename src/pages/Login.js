import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveEmailAction } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleInputsChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  checkInputs = () => {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 5;
    const check = /\S+@\S+\.\S+/;
    if (check.test(email) && password.length > MIN_PASSWORD_LENGTH) return false;
    return true;
  }

  login = (e) => {
    e.preventDefault();
    const { saveEmail, history } = this.props;
    const { email } = this.state;
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <h1>Wallet</h1>
        <form autoComplete="off" className="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleInputsChange }
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleInputsChange }
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-warning"
            disabled={ this.checkInputs() }
            onClick={ (e) => this.login(e) }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (payload) => dispatch(saveEmailAction(payload)),
});

Login.propTypes = {
  history: propTypes.objectOf(propTypes.any).isRequired,
  saveEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
