import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistaDigitado: '',
      buttonDisabled: true,
      loading: false,
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evento) {
    const { artistaDigitado } = this.state;
    this.setState({ artistaDigitado: evento.target.value });
    if (artistaDigitado.length >= 1) {
      this.setState({ buttonDisabled: false });
    }
  }

  async handleClick() {
    const { artistaDigitado } = this.state;
    this.setState({ loading: true });
    await searchAlbumsAPI(artistaDigitado);
    this.setState({ artistaDigitado: '' });
    this.setState({
      loading: false,
      login: true,
    });
  }

  render() {
    const { buttonDisabled, artistaDigitado, loading, login } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? (
          <Carregando />
        ) : (
          <form>
            <h1>Tela de pesquisa</h1>
            <label htmlFor="artista">
              <input
                type="text"
                id="artista"
                data-testid="search-artist-input"
                name="artista"
                onChange={ this.handleChange }
                value={ artistaDigitado }
              />
            </label>
            <label htmlFor="button">
              <input
                type="button"
                data-testid="search-artist-button"
                value=""
                id="button"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
              />
              Entrar
            </label>
            {login ? <Carregando /> : ''}
          </form>
        )}
        <Header />
      </div>
    );
  }
}

export default Search;
