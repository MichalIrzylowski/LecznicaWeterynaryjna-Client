import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {LogoutUser} from '../../redux/ActionCreators'

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTop: true
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 10;
      if (isTop !== this.state.isTop) {
        this.handleScroll(isTop)
      }
    });
  }

  handleScroll = (isTop) => {
    this.setState({isTop});
  }

  render() {

    const user = this.props.user.name === 'Imię' ? `${this.props.user.email}` : `${this.props.user.name} ${this.props.user.surname}`;
    //const isVet = this.props.user.isVet ? <li className='menu-item'><Link to='/NewMessage' >Dodaj wiadomość</Link></li> : ''

    return(
      <nav className={this.state.isTop ? 'navbar' : 'navbar green'}>
        <h2 className='logo'><Link to='/'>Lecznica Weterynaryjna</Link></h2>
        <ul className='menu'>
          <li className='menu-item'><Link to='/' >Strona główna</Link></li>
          <li className='menu-item'><Link to='/About' >O nas</Link></li>
          <li className='menu-item'><Link to='/Services' >Usługi</Link></li>
          <li className='menu-item'><Link to='/Results' >Wyniki Badań</Link></li>
          <li className='menu-item'><Link to='/Contact' >Kontakt</Link></li>
          {this.props.isLoggedIn ? (
            <ul>
              <li className='menu-item'><Link to='/User' >Witaj {user}!</Link></li>
              <li className='menu-item'><Link to='/' onClick={this.props.LogoutUser} >Wyloguj się!</Link></li>
              <li className='menu-item'><Link to='/NewMessage' >Dodaj wiadomość!</Link></li>
            </ul>
          ) : (
            <ul>
              <li className='menu-item'><Link to='Login' >Login</Link></li>
              <li className='menu-item'><Link to='/Register'>Rejestracja</Link></li>
            </ul>
          )}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.user,
    isLoggedIn: reduxState.isLoggedIn
  }
}

export default connect(mapStateToProps, {LogoutUser})(MainMenu);
