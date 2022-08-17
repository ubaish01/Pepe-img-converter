const {PythonShell} = require("python-shell");

let options={
    scriptPath:"C:/Users/Ubaish malik/OneDrive/Desktop/PEPE image compressor/Server",
    args:"ubaish"
};

PythonShell.run("test.py",options,(err,res)=>{
    console.log("inside Pythonshell");
    if(err) console.log(err);
    if(res) console.log(res);
    console.log("exited with code 0");
});