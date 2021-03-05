import React from "react";
import { addWorkout, uploadFile } from "../api";
import { toast } from "react-toastify";

class AddWorkout extends React.Component {
  state = {
    title: "",
    description: "",
    weekdays: [],
    exercises: [],
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

  handleFormSubmit = (event) => {
    event.preventDefault();
    const uploadData = new FormData();
    const { title, description } = this.state;
    //uploadData.append('file', this.state.imageUrl);

    uploadFile(uploadData).then((response) => {
      const newWorkout = {
        title: title,
        description: description,
        //imageUrl: response.data.fileUrl
      };
      addWorkout(newWorkout).then(() => {
        toast.success("Workout created!");
        this.props.history.push("/workouts");
      });
    });
  };

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

        <button type="submit">Create</button>
      </form>
    );
  }
}

export default AddWorkout;
