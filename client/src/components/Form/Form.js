import React,{useState,useEffect} from 'react'
import './Form.css'
import {TextField} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch,useSelector } from 'react-redux'
import { createPost,getPosts, updatePost } from '../../redux/actions/posts'
import { useHistory,useParams } from 'react-router'


const initialPostData = {
    name:'',
    userId:'',
    title:'',
    message:'',
    tags:'',
    selectedFile:'',
}

function Form() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {post_id} = useParams()
    // console.log(post_id);

    const [postData, setPostData] = useState(initialPostData)
    const user = JSON.parse(localStorage.getItem('profile'))


    const post = useSelector((state)=>post_id?state.postReducer.post.find((p)=>p._id===post_id):null)
    // console.log("Post is ",post);
    

    useEffect(() => {
        if(post!=null){
            // console.log("Hello");
            setPostData(post)
        }
    }, [post])

    // console.log("User is ",user);

    const handleSubmit=(e)=>{
        e.preventDefault()
        postData.name=user.user.name
        postData.userId=user.user._id

        // console.log("Post Data is ",postData);
        if(post==null){
            dispatch(createPost(postData))
            dispatch(getPosts())
        }else{
            dispatch(updatePost(post._id,postData))
        }
        history.push('/')
    }

    const clear=(e)=>{
        e.preventDefault()
        setPostData(initialPostData)
    }

    return (
        <div className="form">
            <form className="form__data" autoComplete="off" noValidate onSubmit={handleSubmit}>
                <p className="form__heading">{post?'Edit':'Add'} a Memory</p>
                <TextField 
                    style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={postData.title}
                    onChange={(e)=>setPostData({...postData,title:e.target.value})}
                />
                <TextField 
                    style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}
                    name="message"
                    label="Message"
                    variant="outlined"
                    value={postData.message}
                    onChange={(e)=>setPostData({...postData,message:e.target.value})}
                />
                <TextField 
                    style={{width:"80%",maxWidth:'700px',margin:'10px 0'}}
                    name="tags"
                    label="Tags"
                    variant="outlined"
                    value={postData.tags}
                    onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}
                />
                <FileBase 
                    type="file"
                    multipe={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                /> <br />

                <div className="buttons">
                    <button className="submitBtn" type="submit">Submit</button>
                    <button className="submitBtn" onClick={clear}>Clear</button>
                </div>
                
            </form>
        </div>
    )
}

export default Form
