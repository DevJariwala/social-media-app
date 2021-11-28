import React from 'react'
import './SearchPosts.css'
import {useSelector} from 'react-redux'
import Post from '../AllPost/Post'

function SearchPosts() {

    const posts = useSelector((state) => state.postReducer.post)

    // useEffect(() => {
    //     dispatch()
    // }, [])

    console.log("Post is ",posts);

    return (
        <div className="searchPosts">
            {
                posts?
                posts?.map((post,index)=>(
                    <Post key={index} post={post} />
                ))
                :
                'loading'
            }
            
        </div>
    )
}

export default SearchPosts
