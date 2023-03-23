import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      musics: '',
      album: '',
    };
  }

  componentDidMount() {
    this.musicAlbum();
  }

  musicAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      artistName: response[0].artistName,
      album: response[0].collectionName,
      musics: response.slice(1),
    });
  };

  render() {
    const { artistName, musics, album } = this.state;
    return (

      <div>
        <div data-testid="page-album">
          <Header />
        </div>

        <div>
          <h3 data-testid="artist-name">
            { artistName }
          </h3>
        </div>

        <div>
          <h3 data-testid="album-name">
            { album }
          </h3>
        </div>
        <div>
          { musics.length !== 0 && (musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
            />
          )))}
        </div>
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
}.isRequired;

export default Album;
