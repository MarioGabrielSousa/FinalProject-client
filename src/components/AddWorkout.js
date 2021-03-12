import React from "react";
import { addWorkout, getAllExercises, loggedin } from "../api";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";

class AddWorkout extends React.Component {
  state = {
    name: "",
    category: "FULL BODY",
    description: "",
    weekdays: [],
    exercises: [],
    newExercise: {
      id: "",
      name: "",
      sets: "",
      reps: "",
      rest: "",
      obs: "",
    },
    selectedExercise: "",
    availableExercises: [],
    user: "",
    isPublic: false,
    //imageUrl: 'http://some'
    //local
    //duration
    //weekdays
  };

  componentDidMount() {
    loggedin().then((response) => {
      this.setState({
        user: response.data._id,
      });
    });

    getAllExercises().then((response) => {
      let options = response.data.map((exercise) => ({
        id: exercise.id,
        value: exercise.id,
        label: exercise.name,
      }));
      this.setState({
        availableExercises: options,
      });
    });
  }

  //Isto é para conseguir escrever no formulário
  handleChange = (event) => {
    let { name, value, checked, type } = event.target;
    console.log({ name, value, checked });
    console.log(this.state.weekdays);
    if (name === "isPublic") {
      this.setState({ isPublic: checked });
      return;
    }
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
    event.preventDefault();
    const {
      name,
      category,
      description,
      weekdays,
      exercises,
      user,
      isPublic,
    } = this.state;

    const newWorkout = {
      name,
      category,
      description,
      weekdays,
      exercises,
      user,
      isPublic,
    };
    console.log(newWorkout);
    addWorkout(newWorkout).then(() => {
      toast.success("WORKOUT CREATED!", { className: "toast-message" });
      this.props.history.push("/workouts");
    });
  };

  addExercise = () => {
    const { exercises, newExercise } = this.state;
    newExercise.name = this.state.selectedExercise.label;
    newExercise.id = this.state.selectedExercise.value;
    exercises.push(newExercise);
    this.setState({
      exercises,
      newExercise: {
        id: "",
        name: "",
        sets: "",
        reps: "",
        rest: "",
        obs: "",
      },
    });
  };

  renderWeekdays() {
    return (
      <fieldset className="row gy-2 gx-3 align-items-center">
        <legend className="col-form-label col-sm-2 float-sm-left pt-0">
          Week days
        </legend>
        <div className="col-sm-10">
          <div className="form-check col-auto">
            <input
              id="monInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Mon"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Monday
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              id="tueInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Tue"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Tuesday
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              id="wedInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Wed"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Wednesday
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              id="thuInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Thu"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Thursday
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              id="friInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Fri"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Friday
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              id="satInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Sat"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Saturday
            </label>
          </div>
          <div className="form-check col-auto">
            <input
              id="sunInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Sun"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              Sunday
            </label>
          </div>
        </div>
      </fieldset>
    );
  }

  handleSelectExerciseChange = (name) => {
    this.setState({ selectedExercise: name });
  };

  deleteExercise = (index) => {
    this.setState((previousState) => {
      return {
        exercises: previousState.exercises.filter((e, i) => i !== index),
      };
    });
  };

  renderExercises() {
    const {
      exercises,
      availableExercises,
      newExercise: { sets, reps, rest, obs },
    } = this.state;
    return (
      <div className="form-group row">
        <label htmlFor="inputDescription" className="col-sm-2 col-form-label">
          Exercises
        </label>
        <div className="col-sm-10">
          <div>
            {exercises.map((e, index) => (
              <div className="add-workout-exercise">
                <div>
                  {e.sets ? `${e.sets} x ` : null}
                  {e.reps ? `${e.reps} reps -` : null} {e.name}{" "}
                  {e.obs ? `(${e.obs})` : null}
                  {/*{e.name} ({e.sets}x{e.reps}reps, {e.rest} - ({e.obs}))*/}
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => this.deleteExercise(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <CreatableSelect
              onChange={this.handleSelectExerciseChange}
              options={availableExercises}
              placeholder="Choose an exercise or insert your own here."
            />
            <div className="input-group">
              <input
                className="form-control"
                type="number"
                name="sets"
                value={sets}
                placeholder="sets"
                onChange={this.handleExerciseChange}
              />
              <input
                className="form-control"
                type="number"
                name="reps"
                value={reps}
                placeholder="reps"
                onChange={this.handleExerciseChange}
              />
              <input
                className="form-control"
                type="text"
                name="rest"
                value={rest}
                placeholder="rest"
                onChange={this.handleExerciseChange}
              />
              <input
                className="form-control"
                type="text"
                name="obs"
                value={obs}
                placeholder="Obs:"
                onChange={this.handleExerciseChange}
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={this.addExercise}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { name, category, description } = this.state;
    return (
      <form
        className="add-workout"
        onSubmit={this.handleFormSubmit}
        encType="multipart/form-data"
      >
        <h1>New workout</h1>

        <div className="form-group row">
          <label htmlFor="inputCategory" className="col-sm-2 col-form-label">
            Category
          </label>

          <div className="col-sm-10">
            <select
              className="form-control"
              id="inputCategory"
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="FULL BODY">Full Body</option>
              <option value="UPPER BODY">Upper Body</option>
              <option value="LOWER BODY">Lower Body</option>
              <option value="PUSH DAY">Push Day</option>
              <option value="PULL DAY">Pull Day</option>
              <option value="BIG MUSCLES">Big Muscles</option>
              <option value="SMALL MUSCLES">Small Muscles</option>
              <option value="CROSS TRAINING">Cross Training</option>
              <option value="MIND & BODY">Mind & Body</option>
              <option value="CARDIO">Cardio</option>
              <option value="HIIT">Hiit</option>
              <option value="MIX">Mix</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputDescription" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
        </div>

        {this.renderWeekdays()}
        {this.renderExercises()}
        <div style={{ textAlign: "right" }}>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
            
              id="flexCheckDefault"
              name="isPublic"
              checked={this.state.isPublic}
              onChange={this.handleChange}
            />
            <label class="form-check-label" for="flexCheckDefault">
              Public
            </label>
            </div>
            <div>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddWorkout;
