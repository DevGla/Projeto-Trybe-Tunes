import React, { Component } from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import InfoArtist from '../components/InfoArtist';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      band: '',
      loading: false,
      ready: false,
      bandName: [],
      resultName: '',
    };
  }

  searchAlbums = async (event) => {
    event.preventDefault();
    this.setState({ bandName: '' });
    const { band } = this.state;
    const result = await searchAlbumsAPI(band);
    this.setState({
      bandName: result,
      ready: true,
      resultName: band,
      band: '',
    });
  };

  p = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({
        buttonDisabled: false,
        band: target.value,
      });
    } else {
      this.setState({
        buttonDisabled: true,
        band: target.value,
      });
    }
  };

  render() {
    const { buttonDisabled, loading, ready, bandName, resultName } = this.state;
    const searcherArtist = (
      <label htmlFor="request">
        <input data-testid="search-artist-input" onChange={ this.p } />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.searchAlbums }
        >
          Pesquisar
        </button>
      </label>
    );

    const checkItsLoadingOver = (
      <div>
        <header>{searcherArtist}</header>
        <h2>{`Resultado  de álbuns de:  ${resultName} `}</h2>
        {loading ? <Carregando /> : <InfoArtist bandName={ bandName } />}
      </div>
    );
    return (
      <div data-testid="page-search">
        <Header />
        <form>{ready ? checkItsLoadingOver : searcherArtist}</form>
      </div>
    );
  }
}

export default Search;
