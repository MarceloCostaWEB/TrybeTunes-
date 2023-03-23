import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputArtistBand: '',
      disabledButton: true,
      loading: false,
      resultSeach: '',
    };
  }

  componentDidMount() {
    this.artistSearch();
  }

  artistSearch = async () => {
    const { inputArtistBand } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(inputArtistBand);
    console.log(response);
    this.setState({
      inputArtistBand: '',
      resultSeach: response,
      loading: false,
      seach: inputArtistBand,
    });
  };

  handleChangeButton = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    if (name === 'inputArtistBand') {
      const number2 = 2;
      if (value.length >= number2) {
        this.setState({
          disabledButton: false,
        });
      }
    }
  };

  render() {
    const {
      inputArtistBand,
      disabledButton,
      loading,
      resultSeach,
      seach,
    } = this.state;

    if (loading) { return <Loading />; }
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="inputArtistBand"
            value={ inputArtistBand }
            onChange={ this.handleChangeButton }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledButton }
            onClick={ this.artistSearch }
          >
            Search
          </button>
        </form>
        { resultSeach.length === 0 ? (<h2>Nenhum álbum foi encontrado</h2>)
          : (
            <div>
              {`Resultado de álbuns de: ${seach}`}
              {resultSeach.map((element) => (

                <div key={ element.collectionId }>
                  <p>{ element.collectionName}</p>
                  <img src="artworkUrl100" alt="collectionName" />
                  <Link
                    to={ `/album/${element.collectionId}` }
                    data-testid={ `link-to-album-${element.collectionId}` }
                  >
                    Acesse o album
                  </Link>
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
