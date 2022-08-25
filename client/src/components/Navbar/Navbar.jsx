import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [activeClass, setActiveClass] = useState("home");
  const navigate = useNavigate();

  


  const handleSetActiveClass = (e,name)=>{
    e.preventDefault();
    setActiveClass(name);
    if(name==="home") navigate("/");
    else  navigate(`/${name}`);

    
  }



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundImage: "linear-gradient(rgb(22, 52, 49),rgb(62, 209, 177))" }}>
        <span className="navbar-brand" style={{ cursor: "pointer" }} >We-6</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"  onClick={(e) => { handleSetActiveClass(e,"home") }}>
              <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item" onClick={(e) => {handleSetActiveClass(e,"image") }} >
              <a className="nav-link" href="/image">Image Compression</a>
            </li>
            {/* <li className="nav-item" onClick={(e) => {handleSetActiveClass(e,"document") }} >

              <a className="nav-link" href="/decompression">Document Compression</a>
            </li> */}
            {/* <li className="nav-item"  onClick={(e) => { handleSetActiveClass(e,"about") }} >

              <a className="nav-link " href="/decompression" >About Us</a>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
