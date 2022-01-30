import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      artistaDigitado: '',
      loading: false,
      login: false,
      requisicaoState: [],
      nameArtist: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evento) {
    const { artistaDigitado } = this.state;
    this.setState({
      artistaDigitado: evento.target.value,
      nameArtist: evento.target.value,
    });
    if (artistaDigitado.length >= 1) {
      this.setState({ buttonDisabled: false });
    }
  }

  async handleClick(evento) {
    evento.preventDefault();
    const { artistaDigitado } = this.state;
    this.setState({
      login: true,
      loading: true,
    });
    const requisicao = await searchAlbumsAPI(artistaDigitado);
    this.setState({
      login: true,
      loading: false,
      requisicaoState: requisicao,
      artistaDigitado: '',
    });
  }

  render() {
    const {
      buttonDisabled,
      artistaDigitado,
      loading,
      login,
      requisicaoState,
      nameArtist,
    } = this.state;

    const albunsArtista = (
      <div>
        {<p>{`Resultado de álbuns de: ${nameArtist} `}</p>}
        {loading ? (
          <Carregando />
        ) : (
          <ol>
            {requisicaoState.length ? (
              requisicaoState.map((banda) => (
                <li key={ banda.artistId }>
                  <header>
                    {`${banda.artistName} || ${banda.collectionName}`}

                    <img src={ banda.artworkUrl100 } alt={ banda.artistName } />

                    <Link
                      to={ `/album/${banda.collectionId}` }
                      data-testid={ `link-to-album-${banda.collectionId}` }
                    >
                      More Informations
                    </Link>
                  </header>
                </li>
              ))
            ) : (
              <li> Nenhum álbum foi encontrado</li>
            )}
          </ol>
        )}
      </div>
    );

    return (
      <div data-testid="page-search">
        <label htmlFor="button">
          <input
            type="button"
            data-testid="search-artist-button"
            name="button"
            value=""
            id="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          />
          Pesquisar
        </label>
        {login ? (
          albunsArtista
        ) : (
          <form>
            <h1>Tela de pesquisa</h1>
            <Header />
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
          </form>
        )}
      </div>
    );
  }
}

export default Search;
