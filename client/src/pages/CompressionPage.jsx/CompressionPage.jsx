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
    const [imgName, setImgName] = useState(null);
    const [uploadImgSize, setUploadImgSize] = useState(0);
    const [downloadImgSize, setDownloadImgSize] = useState(0);
    const [download, setDownload] = useState(false);
    const [outImg, setOutImg] = useState("false");


    //Handelling input changes... 
    const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
            setImgName(img.name);
            setUploadImgSize((Math.round(img.size / 1024)) / 1024);

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
            return;
        } else {

            setLoading(true);

            const data = new FormData();
            const fileName = image.name;
            const ext = fileName.split(".")[1];
            console.log(ext)
            data.append("name", fileName);
            data.append("ext", ext);
            data.append("testImage", image);

            axios.post('http://localhost:5000/compression', data)
                .then(res => {

                    setSuccess(true);
                    setImgUploaded(true);
                    setLoading(false);
                    

                })
                .catch(err => {
                    setLoading(false);
                    setImgUploaded(false);
                    console.log(err);
                })
        }


    }

    const handleDownload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setbuttonClicked("download");


        // Handelling auto compressing response 
        axios({
            url: 'http://localhost:5000',
            method: 'GET',
            responseType: 'blob'
        })
            .then(res => {
                setDownload(true);
                setLoading(false);
                const img = res.data;
                console.log(img.name);
                setOutImg(img);
                // console.log(res.size)
                setDownloadImgSize((Math.round(img.size / 1024)) / 1000);
                downloadFile(res.data, "Compressed.jpg");
                setLoading(false);
            })
    }

    return (
        <div className='compression-container'>

            <Navbar />
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



                            {!imgUploaded ? <><label style={{ display: "flex", flexDirection: "column" }} onChange={(event) => handleInputChange(event)} className="custom-file-upload">
                                <input type="file" />
                                <CameraAltIcon style={{ height: "120px", width: "130px" }} />
                                <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    Select an image
                                </span>
                            </label>
                                {imgName ?
                                    <div style={{ margin: "5px 0px" }} className="selectedImg">selected image : <span style={{ color: "red", fontWeight: "700" }}>{imgName}</span></div>
                                    : ""
                                }</>

                                : <>
                                    <div style={{ margin: "35px 0px" }} className="selectedImg">selected image : <span style={{ color: "red", fontWeight: "700" }}>{imgName}</span></div>
                                    {download?
                                    <>
                                    <div className="selectedImg">Size before Compression : <span style={{ color: "green", fontWeight: "700" }}>{uploadImgSize} mb</span></div>
                                    <div style={{ marginBottom: "10px" }} className="selectedImg">Size after compression : <span style={{ color: "green", fontWeight: "700" }}>{downloadImgSize} mb</span></div>
                                    </> : ""
                                    }
                                </>
                            }


                            <span className='buttons'>
                                {!imgUploaded ? (<button
                                    type='submit' onClick={(event) => handleUpload(event)} className="button">
                                    Upload
                                </button>)
                                    :
                                    (
                                        <button onClick={(event) => handleDownload(event, "download")} type='submit' className="button">
                                            Download
                                        </button>
                                    )}


                            </span>
                        </div>

                    </>
                        :
                        <>
                            <Loader />

                            {buttonClicked === "upload" ? <h2>Uploading Image please wait</h2>
                                :
                                <h2>Downloading the Image please wait</h2>
                            }
                        </>
                    }


                </div>
            </div>

            {/* <div className="preview-container">
                <input type="range" id="slider-input" min="0" max="100" step="any" />
                <div className="compressed">Compressed</div>
                <div className="original">Original</div>
                <div className="bottom">
                    <img src="" alt="" />
                </div>
                <div class="top">
                    <img src="" alt="" />
                </div>
            </div> */}

            <ToastContainer />
        </div>
    )
}

export default CompressionPage