const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
// const fs = require("fs");
app.use(cors());
const { PythonShell } = require("python-shell");

let options = {
  scriptPath: "C:/Users/Ubaish malik/OneDrive/Desktop/PEPE image compressor/Server",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


// <-----------------COMPRESSION ROUTE START HERE------------------------>
app.post("/compression", upload.single("testImage"), (req, res) => {
  console.log(req.body);
  console.log(req.body.name);

  if(req.body.ext==="CR2")
  {
    fs.rename(`uploads/${req.body.name}`,"uploads/img1.CR2",(err)=>{
      if(err) console.log(err.message);
      else{

        PythonShell.run("cr2Tojpg.py",options,(err,res)=>{
          console.log("Converting cr2 to jpg");
        })

      }
      
    });
  }
  else
  {
    
    fs.rename(`uploads/${req.body.name}`,"uploads/img1.jpg",(err)=>{
      if(err) console.log(err.message);
      
    });
  }
  
  
  
  PythonShell.run("compression.py",options,(err,res)=>{
  })
  
  
  setTimeout(() => {
    res.status(200).json({status:true,message:"Image uploaded"})
  }, 1000);
  
});

app.get("/", (req, res) => {
  const img = "./uploads/imgcompressed.jpg";
  res.download(img);
})
  // <-----------------COMPRESSION ROUTE END HERE------------------------>

// <------------------COMPARE ROUTE START HERE--------------------->
  app.post("/compare",upload.single("compareImg"),(req,res)=>{
    fs.rename(`uploads/${req.body.name}`,"uploads/compareImg1.jpg",(err)=>{
      if(err) console.log(err.message);
      
    });


  })
// <------------------COMPARE ROUTE END HERE--------------------->


// <------------------DOCUMENT ROUTE START HERE--------------------->

app.post("/document", upload.single("testFile"), (req, res)=>{
  fs.rename(`uploads/${req.body.name}`,"uploads/originalFile.pdf",(err)=>{
    if(err) console.log(err.message);
    else
    {
      res.send("File Uploaded")
    }
    
  });

})

// <------------------DOCUMENT ROUTE END HERE--------------------->









app.listen(port, () => {
  console.log("server running succefully");
});

