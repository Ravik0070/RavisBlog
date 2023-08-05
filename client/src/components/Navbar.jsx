import React, { useContext } from 'react'
import logo from "../img/logo.png"
import { Link } from 'react-router-dom'
import {AuthContext} from "../context/authContext"
const Navbar = () => {
  const { currentUser, logout, isUserPopup, setIsUserPopup } = useContext(AuthContext)
  
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art"><h6>ART</h6></Link>
          <Link className='link' to="/?cat=beauty"><h6>BEAUTY</h6></Link>
          <Link className='link' to="/?cat=technology"><h6>TECHNOLOGY</h6></Link>
          <Link className='link' to="/?cat=education"><h6>EDUCATION</h6></Link>
          <Link className='link' to="/?cat=food"><h6>FOOD</h6></Link>
          <span id="username" onClick={() => setIsUserPopup(!isUserPopup)}>{currentUser?.username}</span>
         {currentUser != null? <span id="logout" onClick={logout}>Logout</span>:<Link className='link' id="login" to="/login">login</Link>}
          {currentUser && <Link to="/write" className='link'><span className="write">
            Write
          </span></Link>}
        </div>
      </div>

    </div>
  )
}

export default Navbar