import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    inputName: '',
    loading: true,
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      inputName: name,
      loading: false,
    });
  }

  render() {
    const { inputName, loading } = this.state;
    if (loading) { return <Loading />; }
    return (
      <header data-testid="header-component">
        <section>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </section>
        <h2 data-testid="header-user-name">{ inputName }</h2>
      </header>
    );
  }
}

export default Header;
