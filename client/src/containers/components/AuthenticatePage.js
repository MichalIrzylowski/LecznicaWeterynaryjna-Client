import React, {Component} from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import {Container, Segment, Form, Button, Icon, Message} from 'semantic-ui-react';
import NegativeMessage from './NegativeMessage'

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      formErrors: {},
      loading: false,
    }
  }

  handleChange = (name) => (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: e.target.value
      }
    })
  }

  validateForm = ({email, password}) => {
    const errors = {};
    if (!validator.isEmail(email)) errors.email = 'Podaj poprawny email!';
    if (!validator.isLength(password, {min: 8})) errors.password = 'Hasło musi mieć przynajmniej osiem znaków!';
    return errors;
  }

  //ADD things after registration
  authenticateUser = (type) => (e) => {
    e.preventDefault();
    const formErrors = this.validateForm(this.state.data);
    this.setState({
      ...this.state,
      formErrors
    })
    if (Object.keys(formErrors).length === 0) {
      this.setState({...this.state, loading: true})
      this.props.onAuthenticateUser(type, this.state.data)
        .then( () => this.props.history.push('/'))
        .catch( () => {
          this.setState({...this.state, loading: false})
        })
    }
  }

  render () {
    const {data} = this.state;
    const type = this.props.register ? 'user_register' : 'login_user';

    return (
      <Container className='formContainer'>
        <Segment>
          <Form onSubmit={this.authenticateUser(type)} loading={this.state.loading}>
            <h2>{this.props.register ? 'Rejestracja' : 'Logowanie'}</h2>
            {this.props.error && <Message negative><Message.Header>{this.props.error}</Message.Header></Message>}
            <Form.Field>
              <label htmlFor='email'>E-mail</label>
              <input type='email' id='email' name='email' value={data.email} onChange={this.handleChange('email')}/>
              {(this.state.formErrors.email) && <NegativeMessage message={this.state.formErrors.email} />}
            </Form.Field>
            <Form.Field>
              <label htmlFor='password'>Hasło</label>
              <input type='password' id='password' name='password' value={data.password} onChange={this.handleChange('password')} />
              {(this.state.formErrors.password) && <NegativeMessage message={this.state.formErrors.password} />}
            </Form.Field>
            <Button type='submit' color='green' animated >
              <Button.Content visible >{this.props.register ? 'Rejestruj się!' : 'Zaloguj się!'}</Button.Content>
              <Button.Content hidden ><Icon name='right arrow' /></Button.Content>
            </Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

RegisterPage.propTypes = {
  onAuthenticateUser: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default RegisterPage;
