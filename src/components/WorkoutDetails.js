import React from "react";
import { deleteWorkout, getWorkout } from "../api";
import ExerciseDetail from "./ExerciseDetail";
import { Accordion } from "react-bootstrap";

class WorkoutDetails extends React.Component {
  state = {
    id: "",
    name: "",
    description: "",
    exercises: [],
    weekDays: "",
  };

  componentDidMount() {
    const workoutId = this.props.match.params.id;
    getWorkout(workoutId).then((response) => {
      this.setState({
        id: response.data._id,
        name: response.data.name,
        description: response.data.description,
        exercises: response.data.exercises,
        weekDays: response.data.weekdays,
      });
    });
  }

  handleDeleteWorkout = (id) => {
    deleteWorkout(id).then(() => {
      //redirect the user to /workouts
      this.props.history.push("/workouts");
    });
  };

  render() {
    const {
      id,
      name,
      description,
      exercises,
      tooltipContent,
      showTooltip,
    } = this.state;
    return (
      <div className="workout-details">
        <h2>{name}</h2>
        <p>{description}</p>
        <Accordion>
          {exercises.map((exercise, index) => {
            return (
              <ExerciseDetail key={index} index={index + ""} id={exercise.id}>
                {exercise.sets}x{exercise.reps} – {exercise.name} ({exercise.obs})
              </ExerciseDetail>
            );
          })}
        </Accordion>
        <button onClick={() => this.handleDeleteWorkout(id)}>Delete</button>
      </div>
    );
  }
}

export default WorkoutDetails;
