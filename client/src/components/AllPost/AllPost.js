import React,{useEffect} from 'react'
import './AllPost.css'
import Post from './Post'
// import img from '../../images/Dev_image.jpeg'
import {useDispatch,useSelector} from 'react-redux'


import { getPosts } from '../../redux/actions/posts'

// const data = [
//     {
//         name:'Dev Jariwala',
//         userId:'6190ecf1e2b0d1f78f6c2fec',
//         title:'Hello therer',
//         message:'I am very happy',
//         tags:['test','happy'],
//         likes:['tedv','dfsdf'],
//         selectedFile:img
//     },
//     {
//         name:'Dev Jariwala',
//         userId:'6190ecf1e2b0d1f78f6c2fec',
//         title:'test',
//         message:'text',
//         tags:['test'],
//         likes:[],
//     },
//     {
//         name:'Dev Jariwala',
//         userId:'6190ecf1e2b0d1f78f6c2fec',
//         title:'test',
//         message:'text',
//         tags:['test'],
//         likes:[],
//     },
// ]

function AllPost() {

    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer.post)

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    console.log("Post is ",posts);

    return (
        <div className="allpost">
            {
                posts?.map((post,index)=>(
                    <Post key={index} post={post} />
                ))
            }

         
            
            {/* <div className="post__card">
                <div className="post__img">
                    <img src={img} alt="" />
                </div>
                <div className="post__info">
                    <div className="post__name">
                        <h3>{data[0].name}</h3>
                        <p>one minute ago</p>
                    </div>
                    <div className="option">
                        <img src="" alt="imga" />
                    </div>
                </div>
                <div className="post__details">
                    <div className="post__tags">
                        <p>tags</p>
                    </div>
                    <h3>Title</h3>
                    <div className="post__message">
                        <p>message</p>
                    </div>
                </div>
                <div className="like_delete">
                    <div className="post__likes">
                        <ThumbUp />
                        <p>10</p>
                    </div>

                    <div className="post__delete">

                        <Delete />
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default AllPost
