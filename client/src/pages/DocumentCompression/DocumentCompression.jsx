import React, { useState } from 'react'
import "./DocumentCompression.css";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Navbar from '../../components/Navbar/Navbar';

const DocumentCompression = () => {
    const [file,setFile] = useState(null);
    const [fileName,setFileName] = useState(null);
    const [uploadFileSize,setUploadFileSize] = useState(0);


    //Handelling input changes... 
    const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let doc = event.target.files[0];
            setUploadFileSize((Math.round(doc.size / 1024)) / 1024);
            setFile(doc);
            setFileName(doc.name);
            console.log(uploadFileSize);

        }
    }
    return (
        <>
            <Navbar/>
            <div className="document-page">
                <h3>Compress your Documents here</h3>
                <div className="document-container">
                    <div className="document-input-container">
                    <label className="document-custom-file-upload">
                        <input type="file" onChange={(e)=>{handleInputChange(e)}} />
                        <PostAddIcon style={{ height: "150px", width: "180px" }} />
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Select Document
                        </span>
                    </label>
                    <div style={{ margin: "5px 0px" }} className="selectedImg">selected image : <span style={{ color: "red", fontWeight: "700" }}>{fileName}</span></div>

                    </div>
                <div className="button-div"><button className='button' style={{width:"15rem"}} >Upload</button></div>
                </div>
            </div>
        </>
    )
}

export default DocumentCompression
