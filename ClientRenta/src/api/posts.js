import axios from './axios.js';

const createPostRequest = (postInfo) => {
    console.log("Creating post with info:", postInfo);
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

const searchPostsRequest = (searchTerm) => {
    return axios.post('/posts/searchPosts', { query: searchTerm })
}

export { createPostRequest, getPostsRequest, getUserPostsRequest, deletePostRequest, searchPostsRequest };