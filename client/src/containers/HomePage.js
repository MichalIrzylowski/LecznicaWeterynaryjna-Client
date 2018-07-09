import React, {Component} from 'react';
import Landing from './components/Landing';
import MessagesList from './MessagesList';

class HomePage extends Component {
  render() {
    return(
      <div className='HomePage'>
        <Landing />
        <MessagesList />
      </div>
    )
  }
}

export default HomePage;
