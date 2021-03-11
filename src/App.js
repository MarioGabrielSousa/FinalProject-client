import logo from "./logo.svg";
import "./App.css";
import ListWorkouts from "./components/ListWorkouts";
import { Route, Switch } from "react-router-dom";
import WorkoutDetails from "./components/WorkoutDetails";
import AddWorkout from "./components/AddWorkout";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { loggedin, login } from "./api";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import ListExercises from "./components/ListExercises";
import ListMyWorkouts from "./components/ListMyWorkouts";

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  setCurrentUser = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <NavBar
          loggedInUser={loggedInUser}
          setCurrentUser={this.setCurrentUser}
        />
        <main className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/workouts" component={ListWorkouts}></Route>
            <Route exact path="/myworkouts" component={ListMyWorkouts}></Route>
            <Route exact path="/exercises" component={ListExercises}></Route>
            {/*<Route exact path="/workouts/add" component={AddWorkout}></Route>*/}
            <PrivateRoute exact path="/workouts/add" component={AddWorkout} />
            <Route
              exact
              path="/workouts/:id"
              component={WorkoutDetails}
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) => {
                return (
                  <Login {...props} setCurrentUser={this.setCurrentUser} />
                );
              }}
            />
            <Route
              exact
              path="/signup"
              render={(props) => {
                return (
                  <Signup {...props} setCurrentUser={this.setCurrentUser} />
                );
              }}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
