import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import logo from "../img/logo.png"
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) { navigate("/") }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await login(inputs);
      if (res.data.success === false) { setError(res.data.response) }
      else { navigate("/") }
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input required type="email" name="email" id="email" value={inputs.email} onChange={handleChange} />
          <label htmlFor="email">email</label>
        </div>
        <div className="inputbox">
          <input required type="password" name="password" id="password" value={inputs.password} onChange={handleChange} />
          <label htmlFor="password">password</label>
        </div>
        <button > Login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account?<Link className='link' to="/register"> Register</Link></span>
      </form>

    </div>
  )
}

export default Login
