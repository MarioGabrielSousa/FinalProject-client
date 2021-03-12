import React from "react";
import { getAllWorkouts } from "../api";
import ListWorkouts from "./ListWorkouts/index";

class ListAllWorkouts extends React.Component {
  state = {
    workouts: [],
    loaded: false,
    user: "",
  };

  setWorkoutList = (response) => {
    this.setState({
      workouts: response.data,
      loaded: true,
    });
  };

  componentDidMount() {
    getAllWorkouts().then(this.setWorkoutList);
  }
  render() {
    const { workouts } = this.state;
    return (
      <div className="workout-list">
        <h1>Training Hub</h1>
        <p>Pick a category and try workouts submitted by our users!</p>
        <ListWorkouts workouts={workouts} />
      </div>
    );
  }
}

export default ListAllWorkouts;
