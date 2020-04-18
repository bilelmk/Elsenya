const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const sequelize = require('./util/database')

const informationRoutes = require('./routes/information') ;
const userRoutes = require('./routes/user') ;

const app = express() ;


sequelize.sync()
    .then((res) => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/", express.static(path.join(__dirname ,"react app")));

app.use('/informations' , informationRoutes);
app.use('/users' , userRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname , "react app" , "index.html"))
});


module.exports = app;
