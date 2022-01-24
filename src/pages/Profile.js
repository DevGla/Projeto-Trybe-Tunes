import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      infoUser: {},
      loading: false,
    };
  }

  componentDidMount() {
    const user = async () => {
      this.setState({ loading: true });
      const infoProfile = await getUser();
      this.setState({ loading: false, infoUser: infoProfile });
    };
    user();
  }

  render() {
    const { loading, infoUser } = this.state;
    const { name, email, image, description } = infoUser;
    return (
      <div data-testid="page-profile">
        <Header dataTestId="header-component" />
        {loading ? (
          <Carregando />
        ) : (
          <section>
            <div>
              <p>
                Nome:
                <span data-testid="header-user-name">{name}</span>
              </p>
              <p>
                Email:
                <span>{email}</span>
              </p>
              <p>
                Descrição:
                <span>{description}</span>
              </p>
              <img
                src={ image }
                alt={ name }
                data-testid="profile-image"
              />
              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
