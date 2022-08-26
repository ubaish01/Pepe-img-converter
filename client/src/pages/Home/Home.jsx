import React from 'react'
import "./home.css"
import {useNavigate} from "react-router-dom"
import Navbar from '../../components/Navbar/Navbar';
const img1 = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaHxlbnwwfHwwfHw%3D&w=1000&q=80"
const img2 = "https://i.pinimg.com/originals/29/9a/2a/299a2a93d4eb261e7302f2dac96ba243.jpg";
const sih_logo = "https://mir-s3-cdn-cf.behance.net/projects/404/beeaf1139339175.Y3JvcCw4MDgsNjMyLDAsMA.png"


const Home = () => {
    const navigate = useNavigate();
    const handleClick = (e,name)=>{
        navigate(name);
    }
  return (
    <div className='home-container'>
    <Navbar/>
    <div className="home">
    <div className="info-container">
            <img className='logo' src={sih_logo} alt="" />  
    <h1 >Welcome to Pepe  Compresser</h1>
    <div className="app-info">
       <div>
     Pepe compression is a web based platform that compress high resolution photographs and documents maintaining the quality at the same time. 
     </div> 
        </div>
        <div className="buttons">



            <span>
                <button style={{fontWeight:"700"}} className="btn btn-info" onClick={(e)=>handleClick(e,"image")}>Image Compression</button>
                <button style={{fontWeight:"700"}} className="btn btn-danger" onClick={(e)=>handleClick(e,"document")}>Document Compression</button>
                <button style={{fontWeight:"700"}} className="btn btn-info" onClick={(e)=>handleClick(e,"document")}>Bulk Compression</button>
            </span>
        </div>

    </div>
  </div>
    </div>
  
  )
}

export default Home
