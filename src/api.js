import axios from 'axios';
const baseURL = `${process.env.REACT_APP_WORKOUTS_API}/api`;


//WORKOUT ROUTES
export const getAllWorkouts = () => {
    return axios.get(`${baseURL}/workouts`);
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

export const uploadFile = (uploadData) => {
    return axios.post(`${baseURL}/upload`, uploadData)
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