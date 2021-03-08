import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../api";
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';

function NavBar({ loggedInUser, setCurrentUser, history }) {
  const logoutUser = () => {
    logout().then(() => {
      setCurrentUser(null);
      //history.push('/');
    });
  };
  return loggedInUser ? (
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
  );
}

export default NavBar;
