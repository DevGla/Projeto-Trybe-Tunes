import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class InfoArtist extends React.Component {
  render() {
    const { bandName } = this.props;
    return (
      <div>
        <ol>
          {bandName.length ? (
            bandName.map((band) => (
              <li key={ band.artistId }>
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
              </li>
            ))
          ) : (
            <li> Nenhum álbum foi encontrado</li>
          )}
        </ol>
      </div>
    );
  }
}

InfoArtist.propTypes = {
  bandName: PropTypes.array,
}.isRequired;

export default InfoArtist;
