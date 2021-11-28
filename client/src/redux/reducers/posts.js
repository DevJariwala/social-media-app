import { COMMENT_POST, CREATE_POST, DELETE_POST, FETCH_ALL, FETCH_BY_SEARCH, LIKE_POST, UPDATE_POST } from "../../constants/actionType";

const initialState = {
    post:[]
}

const postReducer = (state=initialState,action)=>{
    switch (action.type) {
        case CREATE_POST:
            const oldPost = state.post
            oldPost.push(action.payload)
            return {...state,post:oldPost}
        case FETCH_ALL:
            return {...state,post:action.payload}

        case LIKE_POST:
            // console.log("I am likeing post",action.payload);
            const updatePostArray = state.post.map((post)=>(post._id===action.payload._id?action.payload:post))
            return {...state,post:updatePostArray}

        case DELETE_POST:
            const post_id=action.payload
            const newPosts = state.post.filter((post)=>post._id!==post_id)
            console.log("Newposts is ",newPosts);
            return {...state,post:newPosts}

        case UPDATE_POST:
            const updatePostArray1 = state.post.map((post)=>(post._id===action.payload._id?action.payload:post))
            console.log(updatePostArray1);
            return {...state,post:updatePostArray1}

        case FETCH_BY_SEARCH:
            return {...state,post:action.payload}
        
        case COMMENT_POST:
            return {
                ...state,
                post:state.post.map((p)=>(
                    (p._id===action.payload._id)?action.payload:p
                ))
            }

        default:
            return state
    }
}

export default postReducer