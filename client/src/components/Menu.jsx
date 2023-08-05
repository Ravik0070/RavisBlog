import React,{useState,useEffect} from 'react'
import axios from "axios"
import blank from "../img/blank.png"
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(cat){
                try {
                    const res = await axios.get(`/blog/all/?cat=${cat}`);
                    const sortedArray = res.data.blogs.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setPosts(sortedArray)
                } catch (error) {
                    console.log(error)
                }
            } 
        }
        fetchData()
    }, [cat])

    return (
    <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map((post)=>(
            <div className='post' key={post?._id}>
                <img src={post.image?`../upload/${post?.image}`:blank} alt="" />
                <h2>{post?.title}</h2>
                <Link to={`/blog/${post?._id}`} className='link'><button>Readmore</button></Link>
            </div>
        ))}
    </div>
  )
}

export default Menu