import React, {Component} from 'react';
import {Container, Segment, Form} from 'semantic-ui-react';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: ''
      }
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

  render () {
    const {data} = this.state;
    return (
      <Container>
        <Segment>
          <Form>
            <Form.Field>
              <label htmlFor='email'>E-mail</label>
              <input type='email' id='email' name='email' value={data.email} onChange={this.handleChange('email')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor='password'>Hasło</label>
              <input type='password' id='password' name='password' value={data.password} onChange={this.handleChange('password')} />
            </Form.Field>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default RegisterPage;
