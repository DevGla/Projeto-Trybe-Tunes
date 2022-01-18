import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Musicas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
