import React from 'react';
import { deleteWorkout, getWorkout, updateWorkout } from '../api';


class WorkoutDetails extends React.Component {
state = {
    id: '',
    title: '',
    description: '',
    exercises: [],
    weekDays: '',
}

componentDidMount() {
    const workoutId = this.props.match.params.id;
    getWorkout(workoutId).then((response) => {
        this.setState({
            id: response.data._id,
            title: response.data.title,
            description: response.data.description,
            exercises: response.data.exercises,
            weekDays: response.data.weekdays
        })
    })
}

handleDeleteWorkout = (id) => {
    deleteWorkout(id).then(() => {
        //redirect the user to /workouts
        this.props.history.push('/workouts');
    })
}

render() {
    const { id, title, description, exercises, weekDays } = this.state;
    return (
        <>
            <h2>{title}</h2>
            <p>{description}</p>
            <ul>
                {exercises.map(exercise => {
                    return (
                        <li>
                        {exercise.name}:  {exercise.sets}x{exercise.reps} {exercise.obs}                        
                    </li>
                    )

                })}
            </ul>
            <button onClick={() => this.handleDeleteWorkout(id)}>Delete</button>

        </>
    )
}
}

export default WorkoutDetails;