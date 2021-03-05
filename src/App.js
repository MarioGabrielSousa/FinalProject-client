import logo from "./logo.svg";
import "./App.css";
import ListWorkouts from "./components/ListWorkouts";
import { Route, Switch } from "react-router-dom";
import WorkoutDetails from "./components/WorkoutDetails";
import AddWorkout from "./components/AddWorkout";
import NavBar from "./components/NavBar";
import EditWorkout from "./components/EditWorkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { loggedin, login } from "./api";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  componentDidMount() {
    if (this.state.loggedInUser === null) {
      //check if the user is still active on the server
      loggedin().then((response) => {
        if (response.data._id) {
          //there's an active user session on server
          this.setCurrentUser(response.data);
        }
      });
    }
  }

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <ToastContainer />
        <NavBar
          loggedInUser={loggedInUser}
          setCurrentUser={this.setCurrentUser}
        />
        <Switch>
          <Route exact path="/" component={ListWorkouts}></Route>
          <Route exact path="/workouts" component={ListWorkouts}></Route>
          {/*<Route exact path="/workouts/add" component={AddWorkout}></Route>*/}
          <PrivateRoute exact path="/workouts/add" component={AddWorkout} />
          <Route exact path="/workouts/:id" component={WorkoutDetails}></Route>
          <Route
            exact
            path="/workouts/:id/edit"
            component={EditWorkout}
          ></Route>
          <Route
            exact
            path="/login"
            render={(props) => {
              return <Login {...props} setCurrentUser={this.setCurrentUser} />;
            }}
          />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
