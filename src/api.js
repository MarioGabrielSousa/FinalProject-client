import axios from 'axios';
const baseURL = `${process.env.REACT_APP_WORKOUTS_API}/api`;


//WORKOUT ROUTES
export const getAllWorkouts = () => {
    return axios.get(`${baseURL}/workouts`);
}
export const getMyWorkouts = (userId) => {
    return axios.get(`${baseURL}/myworkouts/${userId}`);
}

export const getWorkout = (id) => {
    return axios.get(`${baseURL}/workouts/${id}`);
}

export const addWorkout = (workout) => {
    return axios.post(`${baseURL}/workouts`, workout);
}

export const deleteWorkout = (id) => {
    return axios.delete(`${baseURL}/workouts/${id}`);
}

export const updateWorkout = (updatedWorkout) => {
    return axios.get(`${baseURL}/workouts/${updatedWorkout.id}`, updatedWorkout);
}

// Exercises Routes
export const getAllExercises = () => {
    return axios.get(`${baseURL}/exercises`);
}

export const getExercise = (id) => {
    return axios.get(`${baseURL}/exercises/${id}`);
}

//AUTHENTICATION ROUTES
export const signup = (username, email, password) => {
    return axios.post(`${baseURL}/signup`, {username, email, password})
}

export const login = (username, password) => {
    return axios.post(`${baseURL}/login`, {username, password}, {withCredentials: true});
}

export const logout = () => {
    return axios.post(`${baseURL}/logout`, null, {withCredentials: true});
}

export const loggedin = () => {
    return axios.get(`${baseURL}/loggedin`, {withCredentials: true});
}