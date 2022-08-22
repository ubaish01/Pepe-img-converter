import React from 'react'
import { useState } from 'react'
import "./DecompressionPage.css"
import axios from "axios"
import Loader from '../../components/Loader/Loader'
import downloadFile from "js-file-download";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Navbar from '../../components/Navbar/Navbar'
const DecompressionPage = () => {

    const [loading, setLoading] = useState(false);
    const [imgUploaded, setImgUploaded] = useState(null);
    const [image, setImage] = useState(null);
    const [buttonClicked, setbuttonClicked] = useState("");
    const [isSucces, setSuccess] = useState(null);


    //Handelling input changes... 
    const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    }


    const handleUpload = async (event) => {
        event.preventDefault();
        console.log("upload button clicked")  
        setbuttonClicked("upload"); 


        // if there is an image with post
        if (!image) {
            alert("Please select an image first")
            setSuccess(false);
            return ;
        } else {

            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);

            const data = new FormData();
            const fileName = image.name;
            data.append("name", fileName);
            data.append("testImage", image);
            await axios.post('http://localhost:5000/decompression', data)
                .then(res => {
                    console.log(res.message);
                    setSuccess(true);
                    setImgUploaded(true);
                })
                .catch(err => {
                    setImgUploaded(false);
                    console.log(err);
                })
        }

    }

    const handleDownload = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setbuttonClicked("download");
        axios({
            url:'http://localhost:5000',
            method:'GET',
            responseType:'blob' 
        })
        .then(res=>{
            setLoading(false);
            console.log("Downloading the images");
            downloadFile(res.data,"Compressed.jpg");
        })

    }

    return (
        <div className='decompression-container'>
            <Navbar/>
        <div className="DecompressionPage">

            <div className="container">

                {!loading ? <>
                    <div className="team-">
                        <h3>Team : WE-6</h3>
                    </div>
                    <div className="app-name">
                        <h3> Pepe image converter</h3>
                    </div>
                    <div className="input-area">
                        <label onChange={(event) => handleInputChange(event)} className="custom-file-upload">
                            <input type="file" />
                            <CameraAltIcon style={{height:"120px",width:"130px"}} />
                        </label>
                        <span className='buttons'>
                            {!imgUploaded ? (<button
                                type='submit' onClick={(event) => handleUpload(event)} className="button">
                                Upload
                            </button>)
                                :
                                (
                                <button onClick={(event) => handleDownload(event,"download")} type='submit' className="button">
                                    Download
                                </button>
                                )}
                                

                        </span>
                    </div>

                </>
                    :
                    <>
                        <Loader />

                        {buttonClicked==="upload"?<h2>Uploading Image please wait</h2>
                        :
                        <h2>Downloading the Image please wait</h2>
                        }
                    </>
                }


            </div>
        </div>
        </div>
    )
}

export default DecompressionPage