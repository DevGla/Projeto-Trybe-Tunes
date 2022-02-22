import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
       band: '' });
   }

   render() {
     const { buttonDisabled, loading, ready, bandName, resultName } = this.state;
     const searcherArtist = (
       <label htmlFor="request">
         <input
           data-testid="search-artist-input"
           onChange={ ({ target }) => {
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
           } }
         />
         <button
           data-testid="search-artist-button"
           type="button"
           disabled={ buttonDisabled }
           onClick={ this.searchAlbums }
         >
           Pesquisar
         </button>
       </label>);

     const checkItsLoadingOver = (
       <div>
         <header>
           { searcherArtist }
         </header>
         <h2>
           { `Resultado  de álbuns de:  ${resultName} `}
         </h2>

         { loading ? (
           <Carregando />
         )
           : (
             <ol>
               {bandName.length ? bandName.map((band) => (
                 <li
                   key={ band.artistId }
                 >
                   <header>
                     {`${band.artistName} || ${band.collectionName}`}
                     <img src={ band.artworkUrl100 } alt={ band.artistName } />
                     <Link
                       to={ `/album/${band.collectionId}` }
                       data-testid={ `link-to-album-${band.collectionId}` }
                     >
                       More
                     </Link>
                   </header>
                 </li>))
                 : <li> Nenhum álbum foi encontrado</li>}
             </ol>
           )}
       </div>);
     return (
       <div data-testid="page-search">
         <Header />
         <form>
           {ready ? checkItsLoadingOver : (searcherArtist)}
         </form>
       </div>
     );
   }
}

export default Search;
