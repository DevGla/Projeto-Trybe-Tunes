import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistaDigitado: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evento) {
    const { artistaDigitado } = this.state;
    this.setState({ artistaDigitado: evento.target.value });
    if (artistaDigitado.length >= 1) {
      this.setState({ buttonDisabled: false });
    }
  }

  render() {
    const { buttonDisabled, artistaDigitado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
              // onClick={ this.handleClick }
            />
            Entrar
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
