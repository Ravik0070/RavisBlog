import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext'
import logo from "../img/logo.png"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) { navigate("/") }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/register", inputs)
      console.log(res)
      if (res.data.success == false) { setError(res.data.response) } else { navigate("/login") };
    } catch (error) {
      setError("Something went wrong.")
    }
  }
  return (
    <div className='auth'>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input required type="text" name="username" id="username" value={inputs.username} onChange={handleChange} />
          <label htmlFor="username">username</label>
        </div>
        <div className="inputbox">
          <input required type="email" name="email" id="email" value={inputs.email} onChange={handleChange} />
          <label htmlFor="email">email</label>
        </div>
        <div className="inputbox">  
          <input required type="password" name="password" id="password" value={inputs.password} onChange={handleChange} />
          <label htmlFor="password">password</label>
        </div>
        <button> Register</button>
        {error && <p>{error}</p>}
        <span>Have an account?<Link  className='link' to="/login"> Login</Link></span>
      </form>

    </div>
  )
}

export default Register
