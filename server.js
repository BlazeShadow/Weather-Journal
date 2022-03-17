// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Server port & function to test it
const serverPort = 3000;
app.listen(serverPort, listening = ()=>{
    console.log(`Server is running at ${serverPort}`)
});

//POST route (adds incoming data from request body)
app.post("/post", (req, res)=>{
    projectData.temp = req.body.temp;
    projectData.feeling = req.body.feeling;
    res.send(projectData)
});
//GET route 
app.get("/get", (req,res)=>{
    res.send(projectData)
});
//Main project folder
app.use(express.static('website'));