import React from "react";
import { addWorkout, getAllExercises, loggedin } from "../api";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";

class AddWorkout extends React.Component {
  state = {
    name: "",
    type: "Full body",
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
    if (type === "checkbox") {
      value = event.target.checked;
    }
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
    event.preventDefault();
    const {
      name,
      type,
      description,
      weekdays,
      exercises,
      user,
      isPublic,
    } = this.state;

    const newWorkout = {
      name,
      type,
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
      <fieldset className="form-group row">
        <legend className="col-form-label col-sm-2 float-sm-left pt-0">
          Week days
        </legend>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              id="monInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Mon"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              MON
            </label>
          </div>
          <div className="form-check">
            <input
              id="tueInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Tue"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              TUE
            </label>
          </div>
          <div className="form-check">
            <input
              id="wedInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Wed"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              WED
            </label>
          </div>
          <div className="form-check">
            <input
              id="thuInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Thu"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              THU
            </label>
          </div>
          <div className="form-check">
            <input
              id="friInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Fri"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              FRI
            </label>
          </div>
          <div className="form-check">
            <input
              id="satInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Sat"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              SAT
            </label>
          </div>
          <div className="form-check">
            <input
              id="sunInput"
              className="form-check-input"
              type="checkbox"
              name="weekdays"
              value={"Sun"}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="monInput">
              SUN
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
    this.setState(previousState => {
      return {
        exercises: previousState.exercises.filter((e, i) => i !== index)
      }
    })
  }

  renderExercises() {
    const {
      exercises,
      availableExercises,
      newExercise: { sets, reps, rest, obs },
    } = this.state;
    return (
      <div className="form-group row">
        <label htmlFor="inputDescription" className="col-sm-2 col-form-label">
          Description
        </label>
        <div className="col-sm-10">
          <ul>
            {exercises.map((e, index) => (
              <li>
                {e.name} ({e.sets}x{e.reps}reps, {e.rest} - ({e.obs}))
                <button onClick={() => this.deleteExercise(index)}>Delete</button>
              </li>
            ))}
            <li>
              <CreatableSelect
                onChange={this.handleSelectExerciseChange}
                options={availableExercises}
              />
              <input
                type="number"
                name="sets"
                value={sets}
                placeholder="sets"
                onChange={this.handleExerciseChange}
              />
              <input
                type="number"
                name="reps"
                value={reps}
                placeholder="reps"
                onChange={this.handleExerciseChange}
              />
              <input
                type="text"
                name="rest"
                value={rest}
                placeholder="rest"
                onChange={this.handleExerciseChange}
              />
              <input
                type="text"
                name="obs"
                value={obs}
                placeholder="Obs:"
                onChange={this.handleExerciseChange}
              />
              <button type="button" onClick={this.addExercise}>
                Add
              </button>
              <button type="submit">Create</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { name, type, description, isPublic } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
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
          <label htmlFor="inputisPublic" className="col-sm-2 col-form-label">
            Public
          </label>
          <div className="col-sm-10">
            <input
              type="checkbox"
              className="form-control"
              id="inputisPublic"
              name="isPublic"
              checked={this.state.isPublic}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputType" className="col-sm-2 col-form-label">
            Type
          </label>

          <div className="col-sm-10">
            <select
              id="inputType"
              name="type"
              value={type}
              onChange={this.handleChange}
            >
              <option value="Full Body">Full Body</option>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Push Day">Push Day</option>
              <option value="Pull Day">Pull Day</option>
              <option value="Big Muscles">Big Muscles</option>
              <option value="Small Muscles">Small Muscles</option>
              <option value="Cross Training">Cross Training</option>
              <option value="Mind and Body">Mind & Body</option>
              <option value="Cardio">Cardio</option>
              <option value="Hiit">Hiit</option>
              <option value="Mix">Mix</option>
            </select>
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
      </form>
      /*  <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
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
        <label>Exercises</label>

        

        <button type="submit">Create</button>
      </form> */
    );
  }
}

export default AddWorkout;
