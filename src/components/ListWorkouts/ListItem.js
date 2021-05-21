import React from "react";
import { Link } from "react-router-dom";
import { deleteWorkout } from "../../api";

class ListItem extends React.Component {
  handleDeleteWorkout = (e) => {
    e.preventDefault();
    deleteWorkout(this.props.workout._id).then(this.props.onDelete);
    console.log(e);
    return false;
  };

  render() {
    return (
      <li className="list-workout-item">
        <Link to={`/workouts/${this.props.workout._id}`}>
          <p>{this.props.workout.name}</p>
          <i
            onClick={this.handleDeleteWorkout}
            className="bi-trash action-btn"
          ></i>
        </Link>
      </li>
    );
  }
}

export default ListItem;
