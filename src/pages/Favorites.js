import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      musicFavorite: [],
      nome: 'tudo nosso',
    };
    this.getFavoriteMusic = this.getFavoriteMusic.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  async getFavoriteMusic() {
    this.setState({ loading: true });
    const api = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicFavorite: api,
    });
  }

  render() {
    const { loading, musicFavorite, nome } = this.state;
    return (
      <div>
        <p>{nome}</p>
        {loading ? (
          <Carregando />
        ) : (
          <div data-testid="page-favorites">
            <Header />
            {musicFavorite.map((music) => (
              <MusicCard
                key={ music.trackId }
                id={ music.trackId }
                name={ music.trackName }
                src={ music.previewUrl }
                infoMusic={ music }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default Favorites;
