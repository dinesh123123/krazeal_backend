// import dependancies in app.js fiel
const express=require("express");
const app=express();
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");
const cors=require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Adminpannel_routes=require("./routers/Adminpannel_routes");
const website_routes=require("./routers/website_routes");


// middlewere setup
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
app.set(path.join(__dirname, '/uploads'));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));


//create middlewere
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(session({secret:'my fdgfghbshanky',saveUninitialized: true,resave: true}));
//body parser using
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


//setup routes
app.use("/public",Adminpannel_routes);
app.use("/krazeal/api",website_routes);



//error handler
app.use((err,req,res,next)=>{res.status(404).json({
       error:'bad request'})
 });


module.exports = app;