import Home from "./pages/Home/Home"; 
import {BrowserRouter,Route,Routes} from "react-router-dom"
import CompressionPage from "./pages/CompressionPage.jsx/CompressionPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import DecompressionPage from "./pages/DecompressionPage/DecompressionPage";
import Compare from "./pages/Compare/Compare";
import DocumentCompression from "./pages/DocumentCompression/DocumentCompression";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/document" element={<DocumentCompression/>} />
        <Route  path="/compare" element={<Compare/>} />
          <Route exact path="/" element={<Home/>} />
          <Route  path="/compression" element={<CompressionPage/>} />
          <Route  path="/decompression" element={<DecompressionPage/>} />
          <Route  path="/about" element={<AboutUs/>} />
      </Routes>
    </BrowserRouter>
 
   
    
  );
}

export default App;
