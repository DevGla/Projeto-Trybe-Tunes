import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const userName = await getUser();
    this.setState({
      isLoading: true,
      name: userName.name,
    });
    return userName;
  }

  render() {
    const { isLoading, name } = this.state;

    return (
      <header data-testid="header-component">
        <h1>
          <p data-testid="header-user-name">
            {''}
            {isLoading ? name : <Carregando />}
          </p>
          <Link to="/search" data-testid="link-to-search">
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Musicas
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </h1>
      </header>
    );
  }
}

export default Header;
