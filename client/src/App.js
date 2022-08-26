import Home from "./pages/Home/Home"; 
import {BrowserRouter,Route,Routes} from "react-router-dom"
import CompressionPage from "./pages/CompressionPage.jsx/CompressionPage";
import AboutUs from "./pages/AboutUs/AboutUs";
// import DecompressionPage from "./pages/DecompressionPage/DecompressionPage";
// import Compare from "./pages/Compare/Compare";
import DocumentCompression from "./pages/DocumentCompression/DocumentCompression";
import BulkCompression from "./pages/bulkCompression/BulkCompression";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route  path="/compare" element={<Compare/>} /> */}
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/bulkCompression" element={<BulkCompression/>} />
          <Route  path="/image" element={<CompressionPage/>} />
          <Route  path="/about" element={<AboutUs/>} />
          <Route  path="/document" element={<DocumentCompression/>} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
