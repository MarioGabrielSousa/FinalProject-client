import React from "react";
import { signup, login } from "../api";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: ''
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    signup(username, email, password)
      .then((response) => {
        login(username, password);
        this.props.setCurrentUser(response.data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error)
      });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button>Signup</button>
        </form>
        <p>
          Already have account?
          <Link to={"/login"}>Login</Link>
        </p>
      </div>
    );
  }
}
export default Signup;
