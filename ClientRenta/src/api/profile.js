import axios from './axios.js';

const getProfileRequest = (id) => {
    return axios.get( `/profile/getProfile/${id}` )
}

const editProfileRequest = (id) => {
    return axios.put( `/profile/editProfile/${id}` )
}