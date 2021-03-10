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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">FiT-OH!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/workouts">Everybody's Workouts</Nav.Link>
        </Nav>
        {loggedInUser ? (
          <>
          <Nav.Link href="/myworkouts">My Workouts</Nav.Link>
          <Nav.Link href="/workouts/add">Add Workout</Nav.Link>
          <NavDropdown title="My account">
            <NavDropdown.Item href="/">{loggedInUser.username} My info </NavDropdown.Item>
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
  /* return loggedInUser ? (
    <>
        <p>{loggedInUser.username}</p>
        <ul>
          <li>
            <NavLink to="/">
              <button onClick={logoutUser}>Logout</button>
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/workouts">
              Workouts
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "red" }} exact to="/workouts/add">
              Add Workouts
            </NavLink>
          </li>
        </ul>
    </>
  ) : (
    <>
      <ul>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/signup">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} exact to="/workouts">
            Workouts
          </NavLink>
        </li>
      </ul>
    </>
  ); */
}

export default NavBar;
