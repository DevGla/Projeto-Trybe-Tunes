import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      infoArtist: [],
      infoMusic: [],
    };

    this.apiMusic = this.apiMusic.bind(this);
  }

  componentDidMount() {
    this.apiMusic();
  }

  async apiMusic() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const requisicao = await getMusics(id);
    this.setState({
      infoArtist: requisicao[0],
      infoMusic: requisicao,
    });
  }

  render() {
    const { infoArtist, infoMusic } = this.state;
    console.log(infoMusic);
    return (
      <div data-testid="page-album">
        <h2>
          <Header />
        </h2>
        <section>
          <p data-testid="artist-name">{infoArtist.artistName}</p>
          <p data-testid="album-name">{infoArtist.collectionName}</p>
          {infoMusic.slice(1).map((track) => (
            <MusicCard
              key={ track.trackId }
              id={ track.trackId }
              name={ track.trackName }
              src={ track.previewUrl }
              infoMusic={ track }

            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Album;
