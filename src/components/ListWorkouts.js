import React from "react";
import { getAllWorkouts } from "../api";
import { Link } from "react-router-dom";

class ListWorkouts extends React.Component {
  state = {
    workouts: [],
  };

  componentDidMount() {
    getAllWorkouts().then((response) => {
      this.setState({
        workouts: response.data,
      });
    });
  }

  render() {
    const { workouts } = this.state;
    return (
      <ul>
        {workouts.map((workout) => {
          return (<li key={workout._id}>
          <Link to={`/workouts/${workout._id}`}>
          {workout.title}
          <img src="{workout.imageUrl}"/>
          </Link>
              </li>);
        })}
      </ul>
    );
  }
}

export default ListWorkouts;
