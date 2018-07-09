import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MainNav from './components/MainNav';
import HomePage from './HomePage';
import AuthenticatePage from './components/AuthenticatePage';
import MessageForm from './components/MessageForm';
import User from './components/User';
import {AuthenticateUser} from '../redux/ActionCreators'



class App extends Component {

  render() {
    const {AuthenticateUser} = this.props;
    return (
      <div>
        <MainNav />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/Register'
            render={ props => <AuthenticatePage {...props}
            onAuthenticateUser={AuthenticateUser}
            error={this.props.error}
            register={true}
            />}
          />
          <Route exact path='/Login'
            render={ props => <AuthenticatePage {...props}
            onAuthenticateUser={AuthenticateUser}
            error={this.props.error}
            register={false}
            />}
          />
          <Route exact path='/NewMessage' component={MessageForm} />
          <Route exact patch='/User'
            render={ props => <User {...props}
              name={this.props.user.name}
              surname={this.props.user.surname}
              id={this.props.user.id}
              profileImgUrl={this.props.user.profileImgUrl}
            />}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) =>{
  return {
    user: reduxState.user,
    error: reduxState.error
  }
}

export default withRouter(connect(mapStateToProps, {AuthenticateUser})(App));
