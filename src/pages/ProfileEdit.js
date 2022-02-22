import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

const EMAIL_SHOULD_CONTAIN = /[a-z0-9]+@+[a-z]+.+[a-z]/;

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      isLoading: true,
      isDisabled: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    getUser()
      .then(({ name, email, description, image }) => {
        this.setState({ name, email, description, image, isLoading: false });
      });
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  validations = () => {
    const { name, email, description, image, isDisabled } = this.state;
    let canDisable = isDisabled;
    if (name === ''
    || email === ''
    || !EMAIL_SHOULD_CONTAIN.test(email)
    || description === ''
    || image === '') canDisable = true;
    else canDisable = false;

    this.setState({ isDisabled: canDisable });
  }

  handleInput = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    }, this.validations);
  }

  updateInfoUser = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true },
      () => {
        const { name, email, description, image } = this.state;
        updateUser({ name, email, description, image })
          .then(() => this.setState({ isLoading: false, redirect: true }));
      });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      isLoading,
      isDisabled,
      redirect } = this.state;
    return (
      <>
        <Header />
        { redirect && <Redirect to="/profile" /> }
        <section data-testid="page-profile-edit" className="profile-edit-screen">
          <form>
            <h1>Editar perfil</h1>
            <label htmlFor="name">
              Name
              <input
                autoComplete="off"
                type="text"
                id="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                autoComplete="off"
                type="text"
                id="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                id="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="image">
              Imagem de perfil

              <input
                autoComplete="off"
                id="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleInput }
              />
            </label>
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.updateInfoUser }
            >
              Salvar
            </button>
          </form>
          <section className="image-container">
            <img src={ image } alt="imagem de perfil" />
            { isLoading && <Carregando /> }
          </section>
        </section>
      </>
    );
  }
}

export default ProfileEdit;
