import React from "react";
import { getAllWorkouts, getMyWorkouts, loggedin } from "../api";
import { Link } from "react-router-dom";

class ListWorkouts extends React.Component {
  state = {
    workouts: [],
    user: ''
  };

  setWorkoutList = (response) => {
    this.setState({
      workouts: response.data,
    });
  };

  componentDidMount() {
    loggedin().then(response => {
      if(response.data._id) {
        this.setState({
          user: response.data._id
        })
      } else {
        this.props.history.push('/login')
        return;
      }


      let route = this.props.match.path
      if(route === '/myworkouts') {
        //dependendo da rota, vou ao get all workouts ou então my workouts, como no exemplo das breweries
       getMyWorkouts(this.state.user).then(this.setWorkoutList)
      } else {
        getAllWorkouts().then(this.setWorkoutList);
      }

    })

  }

  render() {
    const { workouts } = this.state;
    return workouts ? (
      <div className="workout-list">
        <h1>All Workouts</h1>
        <ul className="list-group">
          {workouts.map((workout) => {
            return (
              <li key={workout._id} className="list-group-item">
                <Link to={`/workouts/${workout._id}`}>
                  {workout.name}
                  {/*<img src="{workout.imageUrl}"/>*/}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ) : null
  }
}

export default ListWorkouts;
