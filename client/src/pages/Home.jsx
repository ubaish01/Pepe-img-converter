import React from 'react'
import { useState } from 'react'
import "./home.css"
import axios from "axios"
import Loader from '../components/Loader'
const Home = () => {
    const [isUploading,setIsUploading] = useState(false);
    const[loading,setLoading] = useState(false);
    const [imgName,setImageName] = useState("image");
    const [image,setImage] = useState(null);
    const [crsr,setcrsr] = useState(false);


    const handleButtonClick = () =>{
        setLoading(true);
        setTimeout(() => {
            console.log("Button clicked")
            setIsUploading(!isUploading);
            setLoading(false);
        }, 2000);
    }

    //Handelling input changes...
   
    
      const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
          }
    
      }
    
      const [isSucces, setSuccess] = useState(null);

      const submit = async (event) =>{
        event.preventDefault();
        console.log("submit clicked")
        setcrsr(true);


        // HANDLE LOADING STATE 
        setLoading(true);
        setTimeout(() => {
            setIsUploading(!isUploading);
            setLoading(false);
        }, 2000);
      
      
          // if there is an image with post
          if (image) {
            const data = new FormData();
            const fileName = image.name;
            data.append("name",fileName);
            data.append("testImage", image);
            await axios.post('http://localhost:5000',data)
            .then(res=>{console.log(res.message);
                 setSuccess(true);
                 setTimeout(() => {
                    setSuccess(null);
                    setcrsr(false);
                 }, 2000);
                
                })
            .catch(err=>{
                console.log(err);
                
            })
        }
        else
        {
            alert("Please select an image first")
            setcrsr(false);
        }
      }

    return (
        <div className="home">
            
            <div className="container">

                {!crsr ?  <>
                <div className="team-">
                    <h3>Team : WE-6</h3>
                </div>
                <div className="app-name">
                   <h3> Pepe image converter</h3>
                </div>
                <div className="input-area">
                    <label onChange={(event)=>handleInputChange(event)} className="custom-file-upload">
                    <input type="file"/>
                        select image
                    </label>
                    <span  className='buttons'>
                        { !isUploading ?
                       ( <>
                        {loading ? <div className="isUploading">Image is uploading.....</div>:""}
                        {isSucces ? <div className="isUploading">Image uploaded succesfully</div>:""}
                        <button 
                        disabled={isUploading} style={{cursor:crsr?"wait":"pointer"}}
                         type='submit' onClick={(event)=>submit(event)} className="btn">
                            Upload
                        </button>
                       </>
                        )
                        :( <>
                            {loading ? <div className="isUploading">wait image is downloading.....</div>:""}
                            <button   type='submit' onClick={(event)=>handleButtonClick(event)} className="btn">
                                Download
                            </button>
                           </>
                        

                            )}
                    </span>
                </div>

                </>
                :
                <>
                <Loader/>   
                <h2>Uploading Image please wait</h2> 
                </>
            }

            
            </div>
        </div>
    )
}

export default Home
