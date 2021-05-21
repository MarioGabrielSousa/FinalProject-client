import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../api";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";

function NavBar({ loggedInUser, setCurrentUser }) {
  const history = useHistory();
  const logoutUser = () => {
    logout().then(() => {
      setCurrentUser(null);
      history.push("/");
    });
  };
  return (
    <Navbar className="nav-style">
      <Navbar.Brand href="/">DAILY DOSE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/workouts">HUB</Nav.Link>
          {loggedInUser && (
            <>
              <Nav.Link href="/myworkouts">MY WORKOUTS</Nav.Link>
              <Nav.Link href="/workouts/add">ADD WORKOUT</Nav.Link>
            </>
          )}
        </Nav>
        {loggedInUser ? (
          <>
           {/*  <Navbar>{loggedInUser.username}'s logged in!</Navbar> */}

            <NavDropdown className="my-account-dropdown" title="ACCOUNT">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Photo Album</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutUser}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
