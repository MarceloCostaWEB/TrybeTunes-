import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorita: false,
    };
  }

  async componentDidMount() {
    this.setState({
      favorita: await this.favoritMusic(),

    });
  }

  musicFavorite = async ({ target: { checked } }) => {
    const { music, removeFavoritSong } = this.props;
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(music);
      this.setState({
        loading: false,
        favorita: checked,
      });
    } else {
      await
      removeSong(music);
      this.setState({
        loading: false,
        favorita: checked,
      });
      if (removeFavoritSong) {
        removeFavoritSong(music.trackId);
      }
    }
  };

  favoritMusic = async () => {
    const { music: { trackId } } = this.props;
    const songs = await getFavoriteSongs();
    return songs.map((song) => song.trackId).includes(trackId);
  };

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, favorita } = this.state;

    if (loading) return <Loading />;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}

          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            name="favorita"
            onChange={ this.musicFavorite }
            checked={ favorita }
          />
        </label>
        <div>
          { loading && <Loading /> }
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }),
}.isRequired;

export default MusicCard;
