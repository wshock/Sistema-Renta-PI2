import axios from './axios.js';

const createPostRequest = (postInfo) => {
    return axios.post('/posts/post', postInfo)
}

const getPostsRequest = () => {
    return axios.get('/posts/getPosts')
}
export { createPostRequest, getPostsRequest }