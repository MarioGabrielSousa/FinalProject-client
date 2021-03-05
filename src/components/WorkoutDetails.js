import React from 'react';
import { deleteWorkout, getWorkout, updateWorkout } from '../api';


class WorkoutDetails extends React.Component {
state = {
    id: '',
    title: '',
    description: ''
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

handleDeleteWorkout = (id) => {
    deleteWorkout(id).then(() => {
        //redirect the user to /workouts
        this.props.history.push('/workouts');
    })
}

render() {
    const { id, title, description } = this.state;
    return (
        <>
            <h2>{title}</h2>
            <h3>{description}</h3>
            <button onClick={() => this.handleDeleteWorkout(id)}>Delete</button>
            <button onClick={() =>this.props.history.push(`/workouts/${id}/edit`)}>Edit Workout</button>

        </>
    )
}
}

export default WorkoutDetails;