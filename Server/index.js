const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
// const pynode = require('@fridgerator/pynode');
// pynode.startInterpreter();
// pynode.appendSysPath('./');
// pynode.appendSysPath('./some/other/folder/with/python/modules');
const AdmZip = require("adm-zip");
const port = 5000;
app.use(cors());
const path = require("path");
const { PythonShell } = require("python-shell");

let options = {
  scriptPath: "C:/Users/Ubaish malik/OneDrive/Desktop/PEPE image compressor/Server/python-files",
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


// <-----------------SINGLE IMG COMPRESSION ROUTE START HERE------------------------>
app.post("/compression", upload.single("testImage"), (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
    
    fs.rename(`uploads/${req.body.name}`,"uploads/img1.jpg",(err)=>{
      if(err) console.log(err.message);
      
    });
  
  
  
  
  PythonShell.run("compression.py",options,(err,res)=>{
  })  
  
  
    res.status(200).json({status:true,message:"Image uploaded"})
  
  
});

app.get("/", (req, res) => {
  const img = "./uploads/imgcompressed.jpg";
  res.download(img);
})
  // <-----------------SINGLE IMG COMPRESSION ROUTE END HERE------------------------>



// <------------------COMPARE ROUTE START HERE--------------------->
  app.post("/compare",upload.single("testImage"),(req,res)=>{

    console.log(req.body);
    if(req.body.type==="compressed")
    {

      fs.rename(`uploads/${req.body.name}`,"uploads/compressedImg.jpg",(err)=>{
        if(err) console.log(err.message);
        else res.send("Img uploaded")
        
      });
    }else{
      fs.rename(`uploads/${req.body.name}`,"uploads/normalImg.jpg",(err)=>{
        if(err) console.log(err.message);
        else res.send("Img uploaded")
        
      });
      
    }
  })
// <------------------COMPARE ROUTE END HERE--------------------->


// <------------------DOCUMENT ROUTE START HERE--------------------->

// app.post("/document", upload.single("testFile"), (req, res)=>{
//   console.log(req.body.name);

//     fs.rename(`uploads/${req.body.name}`,"uploads/docs/originalFile.pdf",(err)=>{
//       if(err) return console.log(err.message);
//       else console.log("working fine");

//   });

    
//     PythonShell.run("docs_compressor.py",options,(err,res)=>{

//   }) 
  
//   res.send("File Uploaded")

// })
app.post("/document", upload.single("testFile"), (req, res) => {
  console.log(req.body);
    
    fs.rename(`uploads/${req.body.name}`,"uploads/docs/originalFile.pdf",(err)=>{
      if(err) console.log(err.message);
      
    });

    app.get("/document", (req, res) => {
      const pdf = "./uploads/docs/output.pdf";
      res.download(pdf);
    })
  
  
  
  
  PythonShell.run("docs_compressor.py",options,(err,res)=>{
  })  
  
  
    res.status(200).json({status:true,message:"pdf compressed"});
  
  
});

// <------------------DOCUMENT ROUTE END HERE--------------------->

//<------FOLDER TO ZIP CONVERSION START HERE----------------->


async function createZipArchive() {
  try {
    const zip = new AdmZip();
    const outputFile = "test.zip";
    zip.addLocalFolder("./bulk-data/output");
    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

// createZipArchive();

//<------FOLDER TO ZIP CONVERSION END HERE----------------->

//<------ZIP TO FOLDER CONVERSION START HERE----------------->
async function extractArchive(filepath) {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = `${path.parse(filepath).name}_extracted`;
    zip.extractAllTo(outputDir);
    
    console.log(`Extracted to "${outputDir}" successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

//<------ZIP TO FOLDER CONVERSION END HERE----------------->

app.post("/bulk-images", upload.single("testFile"), (req, res)=>{
  fs.rename(`uploads/${req.body.name}`,"./bulk-data/zip/input.zip",(err)=>{
    if(err) console.log(err.message);
    
    
    extractArchive("./bulk-data/zip/input.zip"); //extract to a folder
      PythonShell.run("bulkImgCompression.py",options,(err,res)=>{
        console.log("Bulkby is working");
      })  //Compression the whole directory
   

    
    
    
      res.send(req.body);


    // TO BE CONTINUED...
    
  });

})

app.get("/bulk-images",(req,res)=>{
  createZipArchive();
  const img = "test.zip";
  res.download(img);

  
})



// <------------------------BULK IMG COMPRESSING---------------------------->







app.listen(port, () => {
  console.log("server running succefully");
});

