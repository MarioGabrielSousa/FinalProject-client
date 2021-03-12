import React from "react";
import { Link } from "react-router-dom";

function ListItem({ workout }) {
  return (
    <li key={workout._id} className="list-workout-item">
      <Link to={`/workouts/${workout._id}`}>
        <p>{workout.name}</p>
        <span>{workout.exercises.length} exercises</span>
      </Link>
    </li>
  );
}

export default ListItem;
