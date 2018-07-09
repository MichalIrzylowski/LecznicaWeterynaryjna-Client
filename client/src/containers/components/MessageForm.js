import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Form, Segment, Button, Icon} from 'semantic-ui-react';
import {CreateMessage} from '../../redux/ActionCreators';


class MessageForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      text: ''
    }
  }

  handleChange = (name) => (e) => {
    this.setState({
      ...this.state,
      [name]: e.target.value
    })
  }

  handleSubmit = (userId, message) => (e) => {
    e.preventDefault();
    this.props.CreateMessage(userId, message)
  }

  render() {
    return (
      <Container className='formContainer'>
        <Segment>
          <Form onSubmit={this.handleSubmit(this.props.user.id, this.state)}>
            <Form.Field>
              <label htmlFor='title' >Tytuł wiadomości</label>
              <input type='text' id='title' value={this.state.title} onChange={this.handleChange('title')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor='text' >Tekst wiadomości</label>
              <input type='text' id='text' value={this.state.text} onChange={this.handleChange('text')}/>
            </Form.Field>
            <Button type='submit' color='green' animated >
              <Button.Content visible >Dodaj wiadomość!</Button.Content>
              <Button.Content hidden ><Icon name='right arrow' /></Button.Content>
            </Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

function mapStateToProps (reduxState) {
  return {
    user: reduxState.user
  }
}

export default connect(mapStateToProps, {CreateMessage})(MessageForm);
