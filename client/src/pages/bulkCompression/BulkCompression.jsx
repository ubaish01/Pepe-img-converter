import React, { useState } from 'react'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import Navbar from '../../components/Navbar/Navbar';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import Loader from '../../components/Loader/Loader';

import downloadFile from "js-file-download";


const BulkCompression = () => {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [fileName, setFileName] = useState(null);
    const [uploadFileSize, setUploadFileSize] = useState(0);
    const [buttonClicked, setbuttonClicked] = useState("")
    const [file, setFile] = useState("");
    const [imgUploaded, setImgUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [download,setDownload] = useState(false);
    const [downloadFileSize,setDownloadFileSize] = useState(0)


    //Handelling input changes... 
    const handleInputChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let doc = event.target.files[0];
            setFile(doc);
            setUploadFileSize((Math.round(doc.size / 1024)) / 1024);
            console.log("upload clicked");
            setFileName(doc.name);
            console.log(doc);

        }
    }

    const handleUpload = async (event) => {
        console.log(fileName);
        event.preventDefault();
        console.log("upload button clicked")
        setbuttonClicked("upload");


        // if there is a file  with post
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

                    setSuccess(true);
                    setImgUploaded(true);
                    setLoading(false);
                    console.log(res);

                })
                .catch(err => {
                    console.log(err.message);
                    setLoading(false);
                    setImgUploaded(false);
                    // console.log(err);
                })
        }


    }


    const handleDownload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setbuttonClicked("download");


        // Handelling auto compressing response 
        axios({
            url: 'http://localhost:5000/document',
            method: 'GET',
            responseType: 'blob'
        })
            .then(res => {
                setDownload(true);
                setLoading(false);
                const pdf = res.data;
                console.log(pdf.name);
                // console.log(res.size)
                setDownloadFileSize((Math.round(pdf.size / 1024)) / 1000);
                downloadFile(res.data, "Compressed.pdf");
                setLoading(false);
            })
    }



return (
    <div className='compression-container'>

        <Navbar />
        <div className="CompressionPage">
        <h3>Compress the bulk of images here</h3>

            <div className="container">

                {!loading ? <>
                    
                    <div className="input-area">



                        {!imgUploaded ? <><label style={{ display: "flex", flexDirection: "column" }} onChange={(event) => handleInputChange(event)} className="custom-file-upload">
                            <input type="file" />
                            <DataSaverOnIcon style={{ height: "120px", width: "130px" }} />
                            <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                Select a zip file
                            </span>
                        </label>
                            {fileName ? 
                                <div style={{ margin: "5px 0px" }} className="selectedImg">selected image : <span style={{ color: "red", fontWeight: "700" }}>{fileName}</span></div>
                                : ""
                            }</>

                            : <>
                                <div style={{ margin: "35px 0px" }} className="selectedImg">selected image : <span style={{ color: "red", fontWeight: "700" }}>{fileName}</span></div>
                                {download?
                                <>
                                <div className="selectedImg">Size before Compression : <span style={{ color: "green", fontWeight: "700" }}>{uploadFileSize} mb</span></div>
                                <div style={{ marginBottom: "10px" }} className="selectedImg">Size after compression : <span style={{ color: "green", fontWeight: "700" }}>{downloadFileSize} mb</span></div>
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

        

        <ToastContainer />
    </div>
)
}
export default BulkCompression
