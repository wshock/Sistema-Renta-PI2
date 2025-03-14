import axios from './axios.js';


const registerRequest = (user) => {
    return axios.post( "/auth/register", user )
}  

const loginRequest = (user) => {
    return axios.post( "/auth/login", user )
}

const logoutRequest = () => {
    return axios.get( "/auth/logout" )
}

const verifyTokenRequest = () => {
    return axios.get( "/auth/verifyToken" )
}

export { registerRequest, loginRequest, logoutRequest, verifyTokenRequest }