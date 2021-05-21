import React from "react";
import { getMyWorkouts, loggedin } from "../api";
import ListWorkouts from "./ListWorkouts/index";

class ListMyWorkouts extends React.Component {
  state = {
    workouts: [],
    user: "",
  };

  setWorkoutList = (response) => {
    this.setState({
      workouts: response.data,
      loaded: true,
    });
  };

  handleListUpdate = () => {
    this.setState({
      workouts: [],
      loaded: false,
    });

    loggedin().then((response) => {
      if (response.data._id) {
        this.setState({
          user: response.data._id,
        });
        getMyWorkouts(this.state.user).then(this.setWorkoutList);
      }
    });
  };

  componentDidMount() {
    loggedin().then((response) => {
      if (response.data._id) {
        this.setState({
          user: response.data._id,
        });
        getMyWorkouts(this.state.user).then(this.setWorkoutList);
      }
    });
  }

  render() {
    const { workouts } = this.state;
    return (
      <div className="workout-list">
        <h1>My Workouts</h1>
        <ListWorkouts workouts={workouts} onUpdate={this.handleListUpdate} />
      </div>
    );
  }
}

export default ListMyWorkouts;
