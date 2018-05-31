import React from 'react';
import {Link} from 'react-router-dom'
import {Container, Menu} from 'semantic-ui-react'

const MainMenu = () => {
  return (
    <Menu>
      <Container>
        <Menu.Item as={Link} to='/'>
          Strona główna
        </Menu.Item>
        <Menu.Item as={Link} to='/Register'>
          Zarejestruj się!
        </Menu.Item>
      </Container>
    </Menu>
  )
}


export default MainMenu;
