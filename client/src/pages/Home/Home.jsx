import React from 'react'
import "./home.css"
import {useNavigate} from "react-router-dom"
const img1 = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaHxlbnwwfHwwfHw%3D&w=1000&q=80"
const img2 = "https://i.pinimg.com/originals/29/9a/2a/299a2a93d4eb261e7302f2dac96ba243.jpg";
const sih_logo = "https://mir-s3-cdn-cf.behance.net/projects/404/beeaf1139339175.Y3JvcCw4MDgsNjMyLDAsMA.png"


const Home = () => {
    const navigate = useNavigate();
    const handleClick = (e,name)=>{
        e.preventDefault();
        if(name==="compress") navigate("/compression")
        else navigate("/decompression")
    }
  return (
  <div className="home">
    <div className="info-container">
            <img className='logo' src={sih_logo} alt="" />  
    <h1>Welcome to pepe image converter</h1>
    <div className="app-info">
       <div>
     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut excepturi iste recusandae placeat facere nobis possimus eum eveniet quidem nisi, vero incidunt voluptate nemo cumque natus quod magnam ex. Delectus, deleniti saepe, odit sequi ea excepturi nam culpa, provident distinctio praesentium reprehenderit. Quam, laudantium. Quas rem exercitationem molestias pariatur minus!
     </div> 
        </div>
        <div className="buttons">
            <span>
                <button className="btn btn-info" onClick={(e)=>handleClick(e,"compress")}>Compression</button>
                <button className="btn btn-danger" onClick={(e)=>handleClick(e,"decompress")}>Decompresion</button>
            </span>
        </div>

    </div>
  </div>
  
  )
}

export default Home
