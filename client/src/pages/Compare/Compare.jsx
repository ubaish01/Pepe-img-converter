// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer,toast } from 'react-toastify';

// import "./Compare.css";
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import Navbar from '../../components/Navbar/Navbar';

// const Compare = () => {
//     const [type,setType] = useState(null);
//     const toastOptions = {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//     };

//     const [loading,setLoading]=useState(null);
//     const [compressImg,setCompressImg]=useState(null);
//     const [normalImg,setNormalImg]=useState(null);
//     const [issucced,setSuccess]=useState(null);
//     const [imgUploaded,setImgUploaded]=useState(null);


//     const handleInputChange = (event,type) => {
//         console.log(type);
//         if(type==="compressed")
//         {

//             if (event.target.files && event.target.files[0]) {
//                 let img = event.target.files[0];
//                 setCompressImg(img);    
//             }
//             if (!(compressImg && normalImg)) {
//                 toast.error("Please select both the images.", toastOptions);
//                 return;
//             } else {
    
//                 setLoading(true);
    
//                 const data = new FormData();
//                 const fileName = compressImg.name;
//                 data.append("type","compressed");
//                 data.append("name", fileName);
//                 data.append("testImage", compressImg);
    
//                 axios.post('http://localhost:5000/compare', data)
//                     .then(res => {
    
//                         console.log(res);
//                         setSuccess(true);
//                         setImgUploaded(true);
//                         setLoading(false);
                        
    
//                     })
//                     .catch(err => {
//                         console.log("Something went wrong")
//                         setLoading(false);
//                         setImgUploaded(false);
//                         console.log(err);
//                     })
//             }
    
    
//         }
       
//     }


//     const handleCompare = (e) =>{
//         console.log("Compare button clicked")
//     }

// return (
//     <>
//         <Navbar />
//         <div className="compare-page">
//             <h3>Compare your images here</h3>
//             <div className="compare-container">
//                 <div className="input-container">
//                     <label  onChange={(e)=>handleInputChange(e,"normal")} className="compare-custom-file-upload">
//                         <input type="file" />
//                         <AddAPhotoIcon style={{ height: "120px", width: "130px" }} />
//                         <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                             Original Image
//                         </span>
//                     </label>
//                     <label onChange={(e)=>handleInputChange(e,"compressed")}  className="compare-custom-file-upload" >
//                         <input type="file" />
//                         <AddAPhotoIcon style={{ height: "120px", width: "130px" }} />
//                         <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                             Compressed Image
//                         </span>
//                     </label>
//                 </div>
//                 <div className="button-div"><button className='button' style={{ width: "26rem" }} onClick={(e)=>handleCompare(e)}>Compare</button></div>
//             </div>
//         </div>
//     </>
// )
// }

// export default Compare

import React from 'react'

const Compare = () => {
  return (
    <div>
      
    </div>
  )
}

export default Compare

