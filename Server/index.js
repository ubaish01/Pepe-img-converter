const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
// const fs = require("fs");
app.use(cors());
const {PythonShell} = require("python-shell");

let options={
  scriptPath:"C:/Users/Ubaish malik/OneDrive/Desktop/PEPE image compressor/Server",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "img1.jpg");
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("testImage"), (req, res) => {
  console.log("I am inside the post request")
  console.log(req.body);

    PythonShell.run("test.py",options,(err,res)=>{
      console.log("Runnig python from nodejs");
      console.log("proces finished with exit code 0");
  });
    res.status(200).json({status:true,message:"Image uploaded"})
});

app.get("/",(req,res)=>{
  const img = "./uploads/img1compressed.jpg";
  res.download(img);
})

app.listen(port, () => {
  console.log("server running succefully");
});
