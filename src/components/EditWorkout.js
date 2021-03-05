import React from 'react';
import { getWorkout, updateWorkout } from '../api';

class EditWorkout extends React.Component {
    state = {
        title: "",
        description: "",
        //imageUrl: 'http://some'
        //local
        //duration
        //date
      }
    
componentDidMount() {
    const workoutId = this.props.match.params.id;
    getWorkout(workoutId).then((response) => {
        this.setState({
            id: response.data._id,
            title: response.data.title,
            description: response.data.description
        })
    })
}

      //Isto é para conseguir escrever no formulário
      handleChange = (event) => {
          let { name, value, type } = event.target;
          this.setState({
              [name]: value
          })
      }
    
      handleFormSubmit = (event) => {
          event.preventDefault();
          const { id } = this.state;
          updateWorkout(this.state).then(() => {
              this.props.history.push(`/workouts/${id}`)
          })
      }
    
      render() {
          const { title, description } = this.state;
        return (
          <form onSubmit={this.handleFormSubmit}>
            <label>Title</label>
            <input type="text" name="title" value={title} onChange={this.handleChange} />
    
            <label>Description</label>
            <input type="text" name="description" value={description} onChange={this.handleChange} />
    
            <button type="submit">Update</button>
          </form>
        );
    }
}

export default EditWorkout;