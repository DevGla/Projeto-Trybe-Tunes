import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavorite: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async ({ target: { checked } }) => {
    const { infoAlbum } = this.props;
    this.setState({ loading: true });
    this.setState({ isFavorite: checked });
    await addSong(infoAlbum);
    this.setState({ loading: false });
  };

  render() {
    const { id, src, name } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <div>
        {loading ? (
          <Carregando />
        ) : (
          <div>
            <section>
              <p>{name}</p>
              <audio
                data-testid="audio-component"
                src={ src }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>{src}</code>
              </audio>
              <label htmlFor="favorita">
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${id}` }
                  name="loading"
                  id="favorita"
                  checked={ isFavorite }
                  onChange={ this.handleClick }
                />
                Favoritar
              </label>
            </section>
          </div>
        )}
      </div>
    );
  }
}

// Verificar essa prop de um objeto que funcionou como string
MusicCard.propTypes = {
  infoAlbum: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default MusicCard;
