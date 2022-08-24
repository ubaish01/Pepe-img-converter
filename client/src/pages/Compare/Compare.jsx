import React from 'react'
import "./Compare.css";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Navbar from '../../components/Navbar/Navbar';

const Compare = () => {
    return (
        <>
            <Navbar/>
            <div className="compare-page">
                <h3>Compare your images here</h3>
                <div className="compare-container">
                    <div className="input-container">
                    <label className="compare-custom-file-upload">
                        <input type="file" />
                        <AddAPhotoIcon style={{ height: "120px", width: "130px" }} />
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Original Image
                        </span>
                    </label>
                    <label className="compare-custom-file-upload">
                        <input type="file" />
                        <AddAPhotoIcon style={{ height: "120px", width: "130px" }} />
                        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Compressed Image
                        </span>
                    </label>
                    </div>
                <div className="button-div"><button className='button' style={{width:"26rem"}} >Compare</button></div>
                </div>
            </div>
        </>
    )
}

export default Compare
