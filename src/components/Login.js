import React from "react";
import { login } from "../api";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({[name]: value})
  }

  handleFormSubmit = (event) => {
      event.preventDefault();
      const { username, password } = this.state;
      const { setCurrentUser, history } = this.props;

      login(username, password).then((response) => {
          //if I get a response, it means the user got logged in
        //so now I want to lift the state up to app.js
        //setCurrentUser which is a prop
        toast.info(`Ready to sweat, ${username}?`, { className: "toast-message" });
        setCurrentUser(response.data);
        history.push('/');
            }).catch(() => {
                toast.error('Invalid login');
            })
  }

  render() {
    const { username, password } = this.state;
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={this.handleChange} value={username} />

          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} value={password} />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>
      </>
    );
  }
}

export default Login;
