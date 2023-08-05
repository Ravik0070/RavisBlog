import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
import TruncatWords from '../components/TruncatWords';
import { AuthContext } from '../context/authContext';
import UserPopupProfile from '../components/UserPopupProfile';
import blank from "../img/blank.png"

const Home = () => {
const [posts,setPosts] = useState([]);
  const { isUserPopup } = useContext(AuthContext);
const cat  = useLocation().search;
useEffect(()=>{
  const fetchData = async()=>{
    try {
      const res = await axios.get(`/blog/all${cat}`);
      const sortedArray = res.data.blogs.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setPosts(sortedArray)
    } catch (error) {
    }
  }
  fetchData()
},[cat])
  return (
    <>
    <div className="home">
      <div className="posts">
        {posts.map((post)=>(
          <div className='post' key={post?._id}>
            <div className="img">
              <img src={post.image ? `./upload/${post?.image}` : blank} alt="" />
            </div>
            <div className="content">
              <Link to={`blog/${post?._id}`} className='link'><h1>{post?.title}</h1></Link>
              {post?.createdAt &&
                <p id="posted">Posted {moment(post?.createdAt).fromNow()}</p>}
              <TruncatWords htmlString={post?.description}/>
              <Link to={`blog/${post?._id}`} className='link'><button>Readmore</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    {isUserPopup && <UserPopupProfile />}
    </>
  )
}

export default Home