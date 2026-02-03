require('dotenv').config();
const express = require('express');
const path = require('path');
const port = 3008;
const ejs = require('ejs');
const DatabaseConnection =require('./app/config/dbcon')

// console.log(path);

const app = express();


DatabaseConnection()
app.set("view engine", "ejs");
app.set("views", "views");


app.use(express.json())

const productsApiRoute = require("./app/routes/productsApiRoute");
app.use('/api/v1', productsApiRoute)


app.listen(port, ()=>{
    console.log("server is running in this port", port);
    
});

