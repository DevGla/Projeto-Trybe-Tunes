import React from 'react';
import { PropTypes } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      infoAlbum,
    } = this.props;
    return (
      <div>
        {infoAlbum.slice(1).map((track) => (
          <div key={ track.trackId }>
            <p>{track.trackName}</p>
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>{track.previewUrl}</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  infoAlbum: PropTypes.string,
};

MusicCard.defaultProps = {
  infoAlbum: '',
};

export default MusicCard;
