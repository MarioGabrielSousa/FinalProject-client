import React from "react";
import { getMyWorkouts, loggedin } from "../api";
import ListWorkouts from './ListWorkouts/index';

class ListMyWorkouts extends React.Component {
  state = {
    workouts: [],
    user: "",
  };

  setWorkoutList = (response) => {
    this.setState({
      workouts: response.data,
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
        <ListWorkouts workouts={workouts} />
      </div>
    );
  }
}

export default ListMyWorkouts;
