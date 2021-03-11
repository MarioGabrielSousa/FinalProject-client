import React from "react";
import { getAllWorkouts, getMyWorkouts, loggedin } from "../api";
import { Link } from "react-router-dom";

class ListMyWorkouts extends React.Component {
  state = {
    workouts: false,
    loaded: false,
    user: ''
  };

  setWorkoutList = (response) => {
    this.setState({
      workouts: response.data,
      loaded: true
    });
  };

  componentDidMount() {

      loggedin()
      .then(response => {
        if(response.data._id) {
          this.setState({
            user: response.data._id
          })
          getMyWorkouts(this.state.user).then(this.setWorkoutList)
          return;
        } else {
          setTimeout(() => {
            this.props.history.push('/login');
            
          },5000)
        }
      })


  }

  render() {
    const { workouts, loaded, user } = this.state;
    return loaded ? (
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
    ) : !user ? <p>You must be login in to see this page. You will be redirected shortly. Click here if you're not:<Link to="/login">Login</Link></p> : null
    
  }
}

export default ListMyWorkouts;