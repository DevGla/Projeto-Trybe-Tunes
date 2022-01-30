import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavorite: false,
    };

    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.musicFunc = this.musicFunc.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  handleClick = async ({ target: { checked } }) => {
    this.setState({
      loading: true,
      isFavorite: checked,
    }, this.musicFunc());
  }

  async getLocalStorage() {
    const { id } = this.props;
    this.setState({ loading: true });
    const favoriteSong = await getFavoriteSongs();
    const favorite = favoriteSong.some((music) => music.trackId === id);
    this.setState({
      loading: false,
      isFavorite: favorite,
    });
  }

  musicFunc() {
    const { isFavorite } = this.state;
    const { infoMusic } = this.props;
    if (isFavorite) {
      removeSong(infoMusic).then(() => this.setState({ loading: false }));
    } else {
      addSong(infoMusic).then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  }

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
              <audio data-testid="audio-component" src={ src } controls>
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
  infoMusic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default MusicCard;
