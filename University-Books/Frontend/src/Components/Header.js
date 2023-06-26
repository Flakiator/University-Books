import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/esm/Navbar';

export default function Header() {
  return (
    <Navbar bg="light" variant="light" className="justify-content-center">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');

          .navbar-brand {
            font-family: 'Georgia', serif;
            /* Add any other styling properties for the logo */
          }
        `}
      </style>
      <Nav defaultActiveKey="/" variant="pills">
        <Nav.Link as={NavLink} to="/add" activeClassName="active">
          <img width={30} src={require('./images/add.png')} alt="add" />
        </Nav.Link>
        <Nav.Link as={NavLink} to="/favorites" activeClassName="active">
          <img width={30} src={require('./images/heart.png')} alt="heart" />
        </Nav.Link>
        <Navbar.Brand href="/" className="mx-auto">
          University-Books
        </Navbar.Brand>
        <Nav.Link as={NavLink} to="/search" activeClassName="active">
          <img width={30} src={require('./images/searchicon.png')} alt="search" />
        </Nav.Link>
        <Nav.Link as={NavLink} to="/profile" activeClassName="active">
          <img width="30" height="30" src={require('./images/profil.png')} alt="profile" />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
