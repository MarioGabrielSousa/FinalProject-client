import React from "react";
import { addWorkout, uploadFile } from "../api";
import { toast } from "react-toastify";

class AddWorkout extends React.Component {
  state = {
    title: "",
    description: "",
    weekdays: [],
    exercises: [],
    newExercise: {
      name: "",
      sets:"",
      reps: "",
    },
    //imageUrl: 'http://some'
    //local
    //duration
    //weekdays
  };

  //Isto é para conseguir escrever no formulário
  handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    console.log({ name, value, checked });
    console.log(this.state.weekdays);
    if (name === "weekdays") {
      const index = this.state.weekdays.indexOf(value);
      const weekdays = this.state.weekdays;
      if (index !== -1 && !checked) {
        weekdays.splice(index, 1);
      } else if (index === -1 && checked) {
        weekdays.push(value);
      }
      this.setState({ weekdays });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleExerciseChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      newExercise: {
        ...this.state.newExercise,
        [name]: value,
      },
    });
  };

  handleFormSubmit = (event) => {
    // TODO: REVIEW
    event.preventDefault();
    const uploadData = new FormData();
    const { title, description, weekdays } = this.state;
    //uploadData.append('file', this.state.imageUrl);

    uploadFile(uploadData).then((response) => {
      const newWorkout = {
        title,
        description,
        weekdays,
        //imageUrl: response.data.fileUrl
      };
      addWorkout(newWorkout).then(() => {
        toast.success("Workout created!");
        this.props.history.push("/workouts");
      });
    });
  };

  addExercise = () => {
    const { exercises, newExercise } = this.state;
    exercises.push(newExercise);
    this.setState({
      exercises,
      newExercise: {
        name: "",
        sets: "",
        reps: "",
      },
    });
  };

  renderWeekdays() {
    return (
      <div>
        <label>Weekdays</label>
        <input
          type="checkbox"
          name="weekdays"
          value={"Mon"}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="weekdays"
          value={"Tue"}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="weekdays"
          value={"Wed"}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="weekdays"
          value={"Thu"}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="weekdays"
          value={"Fri"}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="weekdays"
          value={"Sat"}
          onChange={this.handleChange}
        />
        <input
          type="checkbox"
          name="weekdays"
          value={"Sun"}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  renderExercises() {
    const {
      exercises,
      newExercise: { name, sets, reps },
    } = this.state;
    return (
      <div>
        <label>Exercises</label>
        <ul>
          {exercises.map((e) => (
            <li>
              {e.name} ({e.sets}x{e.reps})
            </li>
          ))}
          <li>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Exercise name"
              onChange={this.handleExerciseChange}
            />
            <input
              type="number"
              name="sets"
              value={sets}
              placeholder="Sets"
              onChange={this.handleExerciseChange}
            />
            <input
              type="number"
              name="reps"
              value={reps}
              placeholder="reps"
              onChange={this.handleExerciseChange}
            />
            <button type="button" onClick={this.addExercise}>
              Add
            </button>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const { title, description } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
        />

        {this.renderWeekdays()}

        {this.renderExercises()}

        <button type="submit">Create</button>
      </form>
    );
  }
}

export default AddWorkout;
