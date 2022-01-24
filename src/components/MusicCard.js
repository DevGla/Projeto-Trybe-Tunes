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
    this.setState({ loading: true, isFavorite: checked });
    const requisicao = await addSong(infoAlbum);
    if (requisicao) this.setState({ loading: false });
  }

  render() {
    const { infoAlbum } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <div>
        {loading ? (
          <Carregando />
        ) : (
          infoAlbum.slice(1).map((track) => (
            <div key={ track.trackId }>
              <p>{track.trackName}</p>
              <audio
                data-testid="audio-component"
                src={ track.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>{track.previewUrl}</code>
              </audio>
              <label
                htmlFor="favorita"
              >
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${track.trackId}` }
                  name="loading"
                  id="favorita"
                  checked={ isFavorite }
                  onChange={ this.handleClick }
                />
                Favoritar
              </label>
            </div>
          ))
        )}
      </div>
    );
  }
}

// Verificar essa prop de um objeto que funcionou como string
MusicCard.propTypes = {
  infoAlbum: PropTypes.string,
};

MusicCard.defaultProps = {
  infoAlbum: '',
};

export default MusicCard;
