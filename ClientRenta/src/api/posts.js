import axios from './axios.js';

const createPostRequest = (postInfo) => {
    return axios.post('/posts/post', postInfo)
}

const getPostsRequest = () => {
    return axios.get('/posts/getPosts')
}

const getUserPostsRequest = (userId) => {
    return axios.get(`/posts/getUserPosts/${userId}`)
}

const deletePostRequest = (postId) => {
    return axios.delete(`/posts/deletePost/${postId}`)
}

export { createPostRequest, getPostsRequest, getUserPostsRequest, deletePostRequest };