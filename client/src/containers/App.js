import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import MainMenu from './components/MainMenu';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <MainMenu />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/Register' component={RegisterPage} />
      </div>
    )
  }
}
