import React from 'react'
import { useState } from 'react'
import "./CompressionPage.css"
import axios from "axios"
import Loader from '../../components/Loader/Loader'
import downloadFile from "js-file-download";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Navbar from '../../components/Navbar/Navbar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CompressionPage = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const [loading, setLoading] = useState(false);
    const [imgUploaded, setImgUploaded] = useState(null);
    const [image, setImage] = useState(null);
    const [buttonClicked, setbuttonClicked] = useState("");
    const [isSucces, setSuccess] = useState(null);
    const [imgName,setImgName] = useState("None");
    const [uploadImgSize,setUploadImgSize]=useState(0);
    const [downloadImgSize,setDownloadImgSize]=useState(0);
    const [outImg,setOutImg] = useState("");


    //Handelling input changes... 
    const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
            setImgName(img.name);
            setUploadImgSize((Math.round(img.size/1024))/1000);
            
        }
    }
    
    
    const handleUpload = async (event) => {
        console.log(imgName);
        event.preventDefault();
        console.log("upload button clicked")  
        setbuttonClicked("upload"); 


        // if there is an image with post
        if (!image) {
            toast.error("Please select an image.", toastOptions);
            setSuccess(false);
            return ;
        } else {

            setLoading(true);
            
            const data = new FormData();
            const fileName = image.name;
            data.append("name", fileName);
            data.append("testImage", image);
            await axios.post('http://localhost:5000/compression', data)
            .then(res => {

                    setSuccess(true);
                    setImgUploaded(true);


                    // Handelling auto compressing response 
                    axios({
                        url:'http://localhost:5000',
                        method:'GET',
                        responseType:'blob' 
                    })
                    .then(res=>{
                        setLoading(false);
                        const img = res.data;
                        setOutImg(img);
                        // console.log(res.size)
                        setDownloadImgSize((Math.round(img.size/1024))/1000);
                    })
                })
                .catch(err => {
                    setLoading(false);
                    setImgUploaded(false);
                    console.log(err);
                })
        }

    }

    const handleDownload = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setbuttonClicked("download");
        downloadFile(outImg,"Compressed.jpg");
        setLoading(false);
    }

    return (
        <div className='compression-container'>

            <Navbar/>
        <div className="CompressionPage">

            <div className="container">

                {!loading ? <>
                    <div className="team-">
                        <h3>Team : WE-6</h3>
                    </div>
                    <div className="app-name">
                        <h3> Pepe image converter</h3>
                    </div>
                    <div className="input-area">
                        
                        
                            
                       {!imgUploaded ? <><label style={{display:"flex",flexDirection:"column"}}  onChange={(event) => handleInputChange(event)} className="custom-file-upload">
                            <input type="file" />
                            <CameraAltIcon style={{height:"120px",width:"130px"}} />
                            <span style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                            Select an image
                            </span>
                        </label>
                        <div style={{margin:"5px 0px"}} className="selectedImg">selected image : <span style={{color:"red",fontWeight:"700"}}>{imgName}</span></div>
                        </>
                        
                        :<>
                        <div style={{margin:"35px 0px"}} className="selectedImg">selected image : <span style={{color:"red",fontWeight:"700"}}>{imgName}</span></div>
                        <div  className="selectedImg">Size before Compression : <span style={{color:"green",fontWeight:"700"}}>{uploadImgSize} mb</span></div>
                        <div style={{marginBottom:"10px"}}  className="selectedImg">Size after compression : <span style={{color:"green",fontWeight:"700"}}>{downloadImgSize} mb</span></div>
                        </>
                        }


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
        <ToastContainer/>
                </div>
    )
}

export default CompressionPage