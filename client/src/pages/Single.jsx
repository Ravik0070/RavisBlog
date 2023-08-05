import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../components/Menu'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/authContext"
import moment from "moment"
import axios from 'axios'
import ConvertStringToHtml from '../components/ConvertStringToHtml'
import UserPopupProfile from '../components/UserPopupProfile';
import blank from "../img/blank.png"

const Single = () => {
  const [postOwner,setPostOwner] = useState({})
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const postId = useLocation().pathname.split("/")[2];
  const { currentUser,isUserPopup } = useContext(AuthContext)
  const fetchData = async () => {
    try {
      const res = await axios.get(`/blog/${postId}`);
      setPost(res.data);
      const userRes = await axios.get(`/auth/getowner/${res.data.userId}`)
      setPostOwner(userRes.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/blog/${postId}`)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post.image?`../upload/${post?.image}`: blank } alt="" />
        <div className="user">
          <img src={postOwner.userImage ? `../upload/${postOwner.userImage}`:blank} alt="" />
          <div className="info">
            <span>{postOwner?.userName}</span>
            {post?.createdAt &&
            <p id="posted">Posted {moment(post?.createdAt).fromNow()}</p>}
          </div>
          {currentUser?._id === post?.userId &&
            <div className="edit">
              <Link to={`/write?edit=${post?._id}`} state={post}><img src={Edit} alt="" /></Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          }
        </div>
        <h1>{post?.title}</h1>
        <ConvertStringToHtml htmlString={post?.description} />
      </div>
      <div className="menu"><Menu cat={`${post?.category}`} /></div>
      {isUserPopup && <UserPopupProfile />}
    </div>
  )
}

export default Single
