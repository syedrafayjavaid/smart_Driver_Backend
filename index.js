const express = require('express');
const Mongoose = require('mongoose')
const path = require('path')
var cors = require('cors')

// importing environment file and configuring it
require('dotenv').config()


const server = express()
const port = process.env.PORT || 3001;

var bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());
const localString = 'mongodb://127.0.0.1:27017/smartDriver'



// Connecting To Data base and Registering Schema
try {
    Mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true})
    require("./models/Admin")
    require("./models/CarOwner")
    require("./models/Driver")
    require("./models/User")
    require("./models/CarOwnerRequest")
    require("./models/DriverAttendanceReq")
   
    
    console.log("Successfully Connected to Data Base")
} catch (e) {
    console.log("error has occured possible cause:",e)
}


// MiddlWares
server.use(express.static(path.join(__dirname,'carOwnersProfiles')))
server.use('drivers',express.static(path.join(__dirname,'driverProfiles')))


//Apis Middlewares
server.use('/admin',require(path.join(__dirname,'routes/admin.js')))
server.use('/carOwner',require(path.join(__dirname,'routes/carOwner')))
server.use('/driver',require(path.join(__dirname,'routes/driver.js')))


server.listen(port,()=>{

    console.log("The serve has started listening")

})


//////////////////////////////// SERVER WORKING STATUS //////////////////////////////

server.get('/', async(req, res) => {
    res.send("SMART DRIVER SERVICE IS RUNNING");
})

//-----------------------------------------------------------------------------------
