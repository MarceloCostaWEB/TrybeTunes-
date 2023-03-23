import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    disabled: true,
  };

  componentDidMount() {
    this.callGetUser();
  }

  callGetUser = async () => {
    const returnUserGet = await getUser();
    this.setState({
      name: returnUserGet.name,
      email: returnUserGet.email,
      description: returnUserGet.description,
      image: returnUserGet.image,
    });
  };

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyButton);
  };

  verifyButton = () => {
    const { name, email, description, image } = this.state;
    const verification = name.length > 0
    && email.length > 0 && image.length > 0 && description.length > 0;
    if (verification) {
      this.setState({ disabled: false });
    } else this.setState({ disabled: true });
  };

  sendInformation = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { name, email, description, image } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    await updateUser(obj);
    return history.push('/profile');
  };

  render() {
    const { name, email, description, image, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="name">
            Qual o nome que quer ser chamado(a)?
            <input
              type="text"
              data-testid="edit-input-name"
              id="name"
              name="name"
              value={ name }
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="email">
            Qual o e-mail que você mais utiliza?
            <input
              type="text"
              data-testid="edit-input-email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="description">
            Me fale um pouco sobre você:
            <input
              type="text-area"
              data-testid="edit-input-description"
              id="description"
              name="description"
              value={ description }
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="image">
            Insira a URL de uma foto bem bonita sua:
            <input
              type="text"
              data-testid="edit-input-image"
              id="image"
              name="image"
              value={ image }
              onChange={ this.onChange }
            />

          </label>
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ disabled }
            onClick={ this.sendInformation }
          >
            Editar perfil

          </button>
        </form>
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  push: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
