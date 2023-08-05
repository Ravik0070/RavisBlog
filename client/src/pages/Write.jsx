import axios from 'axios';
import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import UserPopupProfile from '../components/UserPopupProfile';


const Write = () => {
  const { currentUser, isUserPopup } = useContext(AuthContext);
  const state = useLocation().state;
  const navigate = useNavigate();
  const [description, setDescription] = useState(state?.description || '');
  const [title, setTitle] = useState(state?.title || '');
  const [category, setCategory] = useState(state?.category || '');
  const [file, setFile] = useState('');
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data

    } catch (error) {

    }
  }
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl;
    if (file) {
      imgUrl = await upload();
    }
    const cleanedDescription = description.replace(/^<p>/, '').replace(/<\/p>$/, '');
    try {
      state ? await axios.put(`/blog/${state._id}`, { title, description: cleanedDescription, category, image: file ? imgUrl : "" }) :
        await axios.post(`/blog/create`, { title, description: cleanedDescription, category, image: file ? imgUrl : "" });

      navigate("/")

    } catch (error) {

    }
  }

  return ( currentUser ?
      <div className='add'>
          <div className="content">
            <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
            <div className="editContainer">
              <ReactQuill className='editor' theme="snow" value={description} onChange={setDescription} />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h1>Publish</h1>
              <span>
                <b>Status:</b> Draft
              </span>
              <span>
                <b>Visibility:</b> Public
              </span>
              <input type="file" name="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
              <label className="file" htmlFor="file">Upload Image</label>
              <div className="buttons">
                <button>Save as a draft</button>
                <button onClick={handleClick}>Publish</button>
              </div>
            </div>
            <div className="item">
              <h1>Category</h1>
              <div className="cat">
                <input type="radio" checked={category === "art"} name="cat" value="art" id="art" onChange={e => setCategory(e.target.value)} />
                <label htmlFor="art">Art</label>
              </div>
              <div className="cat">
                <input type="radio" checked={category === "technology"} name="cat" value="technology" id="technology" onChange={e => setCategory(e.target.value)} />
                <label htmlFor="technology">Technology</label>
              </div>
              <div className="cat">
                <input type="radio" checked={category === "food"} name="cat" value="food" id="food" onChange={e => setCategory(e.target.value)} />
                <label htmlFor="food">Food</label>
              </div>
              <div className="cat">
                <input type="radio" checked={category === "beauty"} name="cat" value="beauty" id="beauty" onChange={e => setCategory(e.target.value)} />
                <label htmlFor="beauty">Beauty</label>
              </div>
              <div className="cat">
            <input type="radio" checked={category === "education"} name="cat" value="education" id="education" onChange={e => setCategory(e.target.value)} />
            <label htmlFor="education">Education</label>
              </div>

            </div>
          </div>
      {isUserPopup && <UserPopupProfile />}
      </div> : navigate('/')
    )
}

export default Write
