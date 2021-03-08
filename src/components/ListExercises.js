import React from "react";
import { getAllExercises } from "../api";
import { Link } from "react-router-dom";

class ListExercises extends React.Component {
  state = {
    exercises: [],
  };

  componentDidMount() {
    getAllExercises().then((response) => {
      this.setState({
        exercises: response.data,
      });
    });
  }

  render() {
    const { exercises } = this.state;
    return (
      <ul>
        {exercises.map((exercise) => {
          return (<li key={exercise.id}>
          <Link to={`/exercises/${exercise.id}`}>
          {exercise.name}
          {/*<img src="{exercise.imageUrl}"/>*/}
          </Link>
              </li>);
        })}
      </ul>
    );
  }
}

export default ListExercises;