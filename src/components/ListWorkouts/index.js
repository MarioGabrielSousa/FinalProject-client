import React from "react";
import ListItem from "./ListItem";
import "./index.css";

class ListWorkouts extends React.Component {
  state = {
    workoutsByType: {},
  };
  categoriseWorkouts(workouts) {
    const workoutsByType = {};
    workouts.forEach((workout) => {
      let matchingWorkouts = workoutsByType[workout.category];
      if (matchingWorkouts) {
        matchingWorkouts.push(workout);
      } else {
        workoutsByType[workout.category] = [workout];
      }
    });
    console.log(workoutsByType);
    this.setState({ workoutsByType });
  }

  handleDelete = () => {
    this.props.onUpdate();
  };

  componentDidUpdate(props) {
    console.log(props, this.props);
    if (this.props.workouts.length !== props.workouts.length) {
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
              return (
                <ListItem
                  key={workout._id}
                  workout={workout}
                  onDelete={this.handleDelete}
                />
              );
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
