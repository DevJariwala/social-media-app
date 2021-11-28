import React,{useEffect,useState} from 'react'
import './Post.css'
import moment from 'moment'
import ThumbUp from '@material-ui/icons/ThumbUp'
import Delete from '@material-ui/icons/Delete'
import {useDispatch} from 'react-redux'
import {useLocation,useHistory } from 'react-router'
import { deletePost, likePost } from '../../redux/actions/posts'
import menuIcon from '../../images/menuIcon.png'
import Comments from '../Comments/Comments'

function Post({post}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [likes, setLikes] = useState(post?.likes)
    
    const location = useLocation()
    const history = useHistory()
    const [commentSec, setCommentSec] = useState(false)
    // const user = useSelector((state)=>state.authReducer.authData?.user)

    
    const dispatch = useDispatch()

    const handleLike = (post_id)=>{
        
        if(user!=null){
            const user_id=user.user._id
            console.log("post for like",post);
            console.log("Likes are",likes);
            console.log("User id is",user_id);
            
            if(post.likes.find((like)=>like===user_id)){
                console.log("Deleting likes");
                setLikes(post.likes.filter((id)=>id!==user_id))
            }else{
                console.log("Adding like");
                setLikes([...post?.likes,user_id])
            }
            // console.log('user id',user_id);
        
            dispatch(likePost(post_id,user_id))
        }
      
    }

    const handleDelete=(post_id)=>{
        // console.log("Clicked on delete");
        if(user!=null){
            console.log("Clicked on delete");
            dispatch(deletePost(post_id))
        }
    }

    const handleMenuIcon=(post_id)=>{
        console.log("Clicked on Menu");
        if(user!=null){
            history.push(`/updatePost/${post_id}`)
        }
    }

    const handleComment=()=>{
        if(commentSec===true){
            setCommentSec(false)
        }else{
            setCommentSec(true)
        }
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        
    }, [location,post.likes])

    return (
        <div className="post__card">
                <div className="post__img">
                    {
                        post?.selectedFile && <img src={post.selectedFile} alt="" />
                    }
                    
                </div>
                <div className="post__info">
                    <div className="post__name">
                        <h3>{post.name}</h3>
                        <p>{moment(post?.createdAt).fromNow()}</p>
                    </div>
                    <div className="option">
                        <img onClick={()=>handleMenuIcon(post._id)} src={menuIcon} alt="imga" />
                    </div>
                </div>
                <div className="post__details">
                    <div className="post__tags">
                        <p>{post?.tags?.map((tag)=>`#${tag} `)}</p>
                    </div>
                    <h3>{post?.title}</h3>
                    <div className="post__message">
                        <p>{post?.message}</p>
                    </div>
                </div>
                <div className="like_delete">
                    <div style={{opacity:`${user===null?'0.5':'1'}`}} className="post__likes">
                        {/* <img src="" alt="likeIcon" /> */}
                        <ThumbUp onClick={()=>handleLike(post._id)} />
                        
                        {/* <p>{post?.likes.length}</p> */}
                        <p>{likes.length}</p>
                    </div>

                    <div style={{opacity:`${user===null?'0.5':'1'}`}} className="post__comments" onClick={()=>handleComment()}>
                        comments
                    </div>
                    {
                      post?.userId===user?.user?._id &&
                       <div className="post__delete">
                            {/* <img src="" alt="deleteIcon" /> */}
                            {
                                post?.userId===user?.user?._id && <Delete onClick={()=>handleDelete(post._id)} />
                            }
                            
                        </div>
                    }   
                       
                </div >
                    {
                         user!=null && commentSec===true ?
                        <div className="comment_section">
                            <Comments post={post} />
                        </div>
                        :<></>
                        
                    } 
            </div>
    )
}

export default Post
