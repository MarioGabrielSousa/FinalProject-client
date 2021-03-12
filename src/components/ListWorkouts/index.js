import React from "react";
import ListItem from "./ListItem";
import "./index.css";

class ListWorkouts extends React.Component {
  state = {
    workoutsByType: {},
  };
  categoriseWorkouts(workouts) {
    const workoutsByType = this.state.workoutsByType;
    workouts.forEach((workout) => {
      let matchingWorkouts = workoutsByType[workout.category];
      if (matchingWorkouts) {
        matchingWorkouts.push(workout);
      } else {
        workoutsByType[workout.category] = [workout];
      }
    });
    this.setState({ workoutsByType });
  }

  componentDidUpdate(props) {
    if (this.props.workouts !== props.workouts) {
      this.categoriseWorkouts(this.props.workouts);
    }
  }

  renderCategory(category) {
    const workouts = this.state.workoutsByType[category];
    return (
      <div className="category-container col-md-6 col-lg-4">
        <div className={`category ${category}`}>
          <h5>{category}</h5>
          <ul className="list-workouts">
            {workouts.map((workout) => {
              return <ListItem workout={workout} />;
            })}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const categories = Object.keys(this.state.workoutsByType);
    return (
      <div className="workouts-categories row">
        {categories.map((category) => {
          return this.renderCategory(category);
        })}
      </div>
    );
  }
}

export default ListWorkouts;
