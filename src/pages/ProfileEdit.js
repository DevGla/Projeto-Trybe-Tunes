import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

// Regex para validar os caracteres do email
const VALIDATE_EMAIL = /[a-z0-9]+@+[a-z]+.+[a-z]/;

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      profile: false,
      loading: true,
      buttonDisabled: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    getUser()
      .then(({ name, email, description, image }) => {
        this.setState({ name, email, description, image, loading: false });
      });
  }

  validate = () => {
    const { name, email, description, image } = this.state;
    if (name === ''
    || email === ''
    || !VALIDATE_EMAIL.test(email)
    || description === ''
    || image === '') {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, this.validate);
  }

  updateInfoUser = (event) => {
    event.preventDefault();
    this.setState({ loading: true },
      () => {
        const { name, email, description, image } = this.state;
        updateUser({ name, email, description, image })
          .then(() => this.setState({ loading: false, profile: true }));
      });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
      buttonDisabled,
      profile } = this.state;
    return (
      <div>
        <Header />
        { profile && <Redirect to="/profile" /> }
        <section data-testid="page-profile-edit">
          <form>
            <h1>Editar perfil</h1>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                id="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                id="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="image">
              Imagem de perfil

              <input
                id="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ buttonDisabled }
              onClick={ this.updateInfoUser }
            >
              Salvar
            </button>
          </form>
          <section>
            <img src={ image } alt="imagem de perfil" />
            { loading && <Carregando /> }
          </section>
        </section>
      </div>
    );
  }
}

export default ProfileEdit;
