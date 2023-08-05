import React,{useState,useEffect, useContext} from 'react'
import { AuthContext } from '../context/authContext';
import axios from "axios"
import blank from "../img/blank.png"
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {
    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 4,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    // ];
    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(AuthContext)

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