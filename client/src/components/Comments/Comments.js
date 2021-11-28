import React,{useState} from 'react'
import {Typography,TextField} from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import {useDispatch} from 'react-redux'
import './Comments.css'
import { commentPost } from '../../redux/actions/posts'
import ReactScrollableFeed from 'react-scrollable-feed'

function Comments({post}) {
    // console.log(post);
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
   

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const handleComment = async ()=>{
        // console.log(user);
        const finalComment = `${user?.user?.name}: ${comment}`
        console.log(finalComment);
        console.log("clicked on comment");
        // in actions i am also returning the array that's why we get the new comments
        const newComments = await dispatch(commentPost(finalComment,post._id))
        setComments(newComments)
        setComment('')

    }

   

    return (
        <div className="comments">
            <div className="comments__outerContainer">
                <div className="comments__innerContainer">
                    {/* <Typography gutterBottom variant="h6" >Comments</Typography> */}
                    <ReactScrollableFeed>
                        {
                            comments.map((c,i)=>(
                                <Typography key={i} gutterBottom variant="subtitle1" >
                                    <strong>{c.split(': ')[0]}</strong>
                                    :{c.split(':')[1]}
                                </Typography>
                            ))
                        }
                    </ReactScrollableFeed>
                    {/* <div ref={commentsRef} /> */}
                </div>
        
            </div>
            {
                user?.user?.name &&
                <div style={{padding:'5px',display:'flex',alignItems:'center'}}>
                    <TextField 
                        fullWidth
                        // rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    {/* <Button>Send</Button> */}
                    <div onClick={handleComment} style={{cursor:'pointer'}}>
                        <Send style={{padding:'0 10px',color:'blue'}} />
                    </div>
                </div>
            }
            
        </div>
    )
}

export default Comments
