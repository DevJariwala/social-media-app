import React,{useState,useEffect} from 'react'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import logo from '../../images/Logo.png'
import decode from 'jwt-decode'
import { useHistory, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionType'

function Navbar() {

    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [burgerStatus, setBurgerStatus] = useState(false)
    // console.log("User is ",user);

    const logout=()=>{
        console.log("I clicked ");
        dispatch({type:LOGOUT})
        setUser(null)
        history.push('/')
    }
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        const token = user?.token
        // console.log("Token is ",token);
        if(token){
            const decodedToken = decode(token)
            // console.log("Decode token is ",decodedToken);
            if(decodedToken.exp*1000 < new Date().getTime()){
                logout()
                // if token expire, logout the user
            }
        }
    }, [location,user?.user?.token])

    return (
        <nav className="navbar">
            <div className="navbar__logo" onClick={()=>history.push('/')}>
                <img src={logo} alt="logo" />
                <h1>Memories</h1>
            </div>
            {
                user?(
                    <div>
                        <div className="navbar__items">
                            <h3 onClick={()=>history.push('/')}>{user.user.name}</h3>
                            <div className="items">
                                <p onClick={()=>history.push('./searchMemory')}>Search Memories</p>
                                <p onClick={()=>history.push('./addMemory')} >Add Memories</p>
                                <p onClick={logout} >Logout</p>
                            </div>
                            <div className="menu">
                                <MenuIcon style={{marginRight:'10px',marginTop:'9px',cursor:'pointer'}} onClick={()=>setBurgerStatus(true)} className="menu__icon" />
                            </div>
                        </div>

                        <div className={`burger__nav ${burgerStatus?"display":""}`}>
                            <div className="closeIcon">
                                <CloseIcon onClick={()=>setBurgerStatus(false)} className="close"/>
                            </div>
                            <p onClick={()=>history.push('./searchMemory')}>Search Memories</p>
                            <p onClick={()=>history.push('./addMemory')}>Add Memories</p>
                            <p onClick={logout}>Logout</p>
                        </div>

                    </div>
                    
                ):(
                    <div className="navbar__items" onClick={()=>history.push('/auth')}>
                        <p>Sign In/Sign Up</p>
                    </div>
                )
            }
            {/* <div className="navbar__items">
                <p onClick={handleAllMemory}>Add Memories</p>
                <p>Sign In/Sign Up</p>
            </div> */}
        </nav>
    )
}

export default Navbar
