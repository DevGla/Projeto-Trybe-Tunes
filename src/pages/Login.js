import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

const MAX_TAM_VALUE = 2;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nomeDigitado: '',
      buttonDisabled: true,
      loading: false,
      login: false,
      dadosApi: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evento) {
    const { nomeDigitado } = this.state;
    this.setState({ nomeDigitado: evento.target.value });
    if (nomeDigitado.length >= MAX_TAM_VALUE) {
      this.setState({ buttonDisabled: false });
    }
  }

  async handleClick() {
    const { nomeDigitado } = this.state;
    this.setState({ loading: true });
    const requisicao = await createUser({ name: nomeDigitado });
    this.setState((currentState) => ({
      loading: false,
      login: true,
      dadosApi: [...currentState.dadosApi, requisicao],
    }));
  }

  render() {
    const { nomeDigitado, buttonDisabled, loading, login } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? (
          <Carregando />
        ) : (
          <form>
            <h1>Tela de Login</h1>
            <label htmlFor="nome">
              Digite seu nome:
              <input
                type="text"
                value={ nomeDigitado }
                id="nome"
                data-testid="login-name-input"
                name="name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="button">
              <input
                type="button"
                data-testid="login-submit-button"
                value=""
                id="button"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
              />
              Entrar
            </label>
            {login ? <Redirect to="/search" /> : ''}
          </form>
        )}
      </div>
    );
  }
}

export default Login;
