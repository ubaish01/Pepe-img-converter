import React, { useState } from 'react'
import "./DocumentCompression.css";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Navbar from '../../components/Navbar/Navbar';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"


const DocumentCompression = () => {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState(null);
    const [uploadFileSize,setUploadFileSize] = useState(0);
    const [buttonClicked,setbuttonClicked] = useState("")


    //Handelling input changes... 
    const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let doc = event.target.files[0];
            setUploadFileSize((Math.round(doc.size / 1024)) / 1024);
            setFile(doc);
            setFileName(doc.name);

        }
    }

    const handleUpload = async (event) => {
        console.log(fileName);
        event.preventDefault();
        console.log("upload button clicked")
        setbuttonClicked("upload");


        // if there is an image with post
        if (!file) {
            toast.error("Please select an file.", toastOptions);
            return;
        } else {

            // setLoading(true);

            const data = new FormData();
            const docsName = file.name;
            // const ext = fileName.split(".")[1];
            // console.log(ext)
            data.append("name", docsName);
            // data.append("ext", ext);
            data.append("testFile", file);

            axios.post('http://localhost:5000/document', data)
                .then(res => {

                    // setSuccess(true);
                    // setImgUploaded(true);
                    // setLoading(false);
                    console.log(res);

                })
                .catch(err => {
                    console.log(err.message);
                    // setLoading(false);
                    // setImgUploaded(false);
                    // console.log(err);
                })
        }


    }

    return (
        <>
            <Navbar/>
            <div className="document-page">
                <h3>Compress your Documents here</h3>
                <div className="document-container">
                    <div className="document-input-container">
                    <label className="document-custom-file-upload" onChange={(event) => handleInputChange(event)} >
                        <input type="file" />
                        <PostAddIcon style={{ height: "150px", width: "180px" }} />
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Select Document
                        </span>
                    </label>
                    <div style={{ margin: "5px 0px" }} className="selectedImg">selected image : <span style={{ color: "red", fontWeight: "700" }}>{fileName}</span></div>

                    </div>
                <div className="button-div"><button className='button' style={{width:"15rem"}} onClick={(e)=>handleUpload(e)}>Upload</button></div>
                </div>
            </div>
        </>
    )
}

export default DocumentCompression
