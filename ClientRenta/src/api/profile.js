import axios from './axios.js';

const getProfileRequest = () => {
    return axios.get( `/profile/getProfile` )
}

const editProfileRequest = (updateInfo) => {
    return axios.patch( `/profile/editProfile`, updateInfo )
}

export { getProfileRequest, editProfileRequest }