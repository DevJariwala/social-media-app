import axios from 'axios'

// const API = axios.create({baseURL:'http://localhost:5000'})
const API = axios.create({baseURL:'https://app-social-media-app.herokuapp.com/'})

// for middleware
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


export const signUp = (formData) => API.post('/user/signup',formData)
export const signIn = (formData) => API.post('/user/signin',formData)

export const createPost = (newPost) => API.post('/posts',newPost)
export const fetchPosts = () => API.get('/posts')
export const likePost = (post_id,user_id) => API.patch(`/posts/${post_id}/${user_id}/likePost`)
export const deletePost =(post_id)=>API.patch(`/posts/${post_id}`)
export const updatePost =(post_id,updatedPost)=>API.patch(`posts/${post_id}/updatePost`,updatedPost)
export const fetchPostsBySearch = (searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`)
export const comment = (comment,post_id)=>API.post(`/posts/${post_id}/commentPost`,{comment})