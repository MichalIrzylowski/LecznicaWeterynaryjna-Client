import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Item} from 'semantic-ui-react';
import {FetchMessages, DeleteMessage} from '../redux/ActionCreators';
import Message from './components/Message';

class MessagesList extends Component {

  componentDidMount() {
    this.props.FetchMessages();
  }

  render () {

    let Messages = this.props.messages.map( m => (
      <Message
        key={m._id}
        title={m.title}
        text={m.text}
        author={m.author}
        onDelete={this.props.DeleteMessage.bind(this, m.author._id, m._id)}
        isCorrectUser={this.props.currentUser === m.author._id}
      />
    ));

    return(
      <section>
        <h3>Ogłoszenia parafialne:</h3>
        <hr />
        <Item.Group>
          {Messages}
        </Item.Group>
      </section>

    )
  }
}

function mapStateToProps (reduxState) {
  return {
    currentUser: reduxState.user.id,
    messages: reduxState.messages
  }
}

export default connect(mapStateToProps, {FetchMessages, DeleteMessage})(MessagesList);
