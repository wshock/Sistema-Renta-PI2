import axios from './axios.js';


const registerRequest = (user) => {
    return axios.post( `/register`, user )
}  

const loginRequest = (user) => {
    return axios.post( `/login`, user )
}

const logoutRequest = () => {
    return axios.get( `/logout` )
}

const verifyTokenRequest = () => {
    return axios.get( `/verifyToken` )
}

export { registerRequest, loginRequest, logoutRequest, verifyTokenRequest }