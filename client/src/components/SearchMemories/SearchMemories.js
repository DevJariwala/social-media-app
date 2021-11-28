import React,{useState} from 'react'
import './SearchMemories.css'
import {TextField} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../redux/actions/posts'

function SearchMemories() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const searchPost=()=>{
        
        if(search.trim() || tags){
            console.log(search);
            console.log(tags);
            dispatch(getPostsBySearch({search:search,tags:tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`)
            console.log("after");
        }else{
            history.push('/')
        }
    }

    const handleKeyPress=(e)=>{
        if(e.keyCode===13){
            searchPost()
        }
    }

    const handleAdd =(tag)=>{
        setTags([...tags,tag])
    }

    const handleDelete=(tagToDelete)=>{
        setTags(tags.filter((tag)=>tag!==tagToDelete))
    }

    return (
        <div className="searchMemories">
            <h3 className="searchMemories__head">Search Memories</h3>
            <TextField 
                style={{margin:'10px 0px'}}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <ChipInput 
                style={{margin:'10px 0px 20px 0px'}}
                value={tags}
                label="Search Tags"
                variant="outlined"
                onAdd={handleAdd}
                onDelete={handleDelete}
                fullWidth
            />
            <button className="searchMemories__btn" onClick={searchPost}>Search</button>
        </div>
    )
}

export default SearchMemories
