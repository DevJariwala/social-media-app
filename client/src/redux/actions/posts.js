import * as api from '../../api/index'
import { COMMENT_POST, CREATE_POST, DELETE_POST, FETCH_ALL, FETCH_BY_SEARCH, LIKE_POST, UPDATE_POST } from '../../constants/actionType';

export const createPost = (post) => async(dispatch)=>{
    try {
        const {data}= await api.createPost(post)
        dispatch({type:CREATE_POST,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = () => async(dispatch)=>{
    try {
        const {data} = await api.fetchPosts();
        console.log("Data for post is ",data);
        dispatch({type:FETCH_ALL,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (post_id,user_id) => async(dispatch)=>{
    // console.log(post_id,user_id);
    try {
        const {data} = await api.likePost(post_id,user_id)
        // console.log("UPdated post",data);
        dispatch({type:LIKE_POST,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (post_id) => async(dispatch)=>{
    try {
        await api.deletePost(post_id)
        dispatch({type:DELETE_POST,payload:post_id})
    } catch (error) {
        console.log(error);
    }
}

export const updatePost =(post_id,updatedPost) => async(dispatch)=>{
    try {
        const {data} = await api.updatePost(post_id,updatedPost)
        // console.log("Updated data is",data);
        dispatch({type:UPDATE_POST,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch)=>{
    console.log("Herer",searchQuery);
    try {

        const {data:{data}} = await api.fetchPostsBySearch(searchQuery)
        console.log("Data is ",data);
        dispatch({type:FETCH_BY_SEARCH,payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (comment,post_id) => async(dispatch)=>{
    try {
        const {data} = await api.comment(comment,post_id)
        console.log("Data is ",data);
        dispatch({type:COMMENT_POST,payload:data})
        return data.comments
    } catch (error) {
        console.log(error);
    }
}