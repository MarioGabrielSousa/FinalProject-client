import React from "react";
import { signup, login } from "../../api";
import { Link } from "react-router-dom";
import './index.css';

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
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
        console.log(error);
      });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div className="signup">
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            className="form-control"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>E-mail:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Signup</button>
        </form>
        <p>
          Got an account already?
          <Link to={"/login"}> Login here!</Link>
        </p>
      </div>
    );
  }
}
export default Signup;
