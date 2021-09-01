import React from "react";
import { login } from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { setCurrentUser, history } = this.props;

    login(username, password)
      .then((response) => {
        //if I get a response, it means the user got logged in
        //so now I want to lift the state up to app.js
        //setCurrentUser which is a prop
        toast.info(`Ready to sweat, ${username}?`, {
          className: "toast-message",
        });
        setCurrentUser(response.data);
        history.push("/");
      })
      .catch(() => {
        toast.error("Invalid login");
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="registration-form">
        <form onSubmit={this.handleFormSubmit}>
          <div class="form-icon">
            <span>
              <i class="icon icon-user"></i>
            </span>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control item"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control item"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-block create-account">
              Jump right in!
            </button>
          </div>
        </form>
        <div class="social-media">
          <h5>
            Not a member yet? Sign up <a href="/signup">here</a>!
          </h5>
        </div>
      </div>
    );
  }
}

export default Login;
