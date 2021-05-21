import React from "react";
import { getAllWorkouts } from "../api";
import ListWorkouts from "./ListWorkouts/index";

class ListAllWorkouts extends React.Component {
  state = {
    workouts: [],
    loaded: false,
    user: "",
  };

  handleListUpdate = () => {
    this.setState({
      workouts: [],
      loaded: false,
    });
    getAllWorkouts().then((response) => {
      console.log(response);
      this.setState({
        workouts: response.data,
        loaded: true,
      });
    });
  };

  async componentDidMount() {
    const response = await getAllWorkouts();
    this.setState({
      workouts: response.data,
      loaded: true,
    });
  }

  render() {
    const { workouts } = this.state;
    return (
      <div className="workout-list">
        <h1>HUB</h1>
        <h5>Pick a category and try workouts submitted by our users!</h5>
        <br />
        <ListWorkouts workouts={workouts} onUpdate={this.handleListUpdate} />
      </div>
    );
  }
}

export default ListAllWorkouts;
