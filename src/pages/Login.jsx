import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    inputName: '',
    disabledButton: true,
    loading: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    if (name === 'inputName') {
      const number3 = 3;
      if (value.length >= number3) {
        this.setState({
          disabledButton: false,
        });
      }
    }
  };

  handleClickButton = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { inputName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: inputName });
    history.push('/search');
  };

  render() {
    const { inputName, disabledButton, loading } = this.state;
    if (loading) { return <Loading />; }
    return (
      <div data-testid="page-login">
        <form>

          <input
            type="text"
            name="inputName"
            data-testid="login-name-input"
            id="inputName"
            placeholder="Qual é o seu nome?"
            onChange={ this.handleChange }
            value={ inputName }
          />

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disabledButton }
            onClick={ this.handleClickButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
