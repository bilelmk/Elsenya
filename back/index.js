const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./util/database");

const informationRoutes = require("./routes/information");
const userRoutes = require("./routes/user");
const informationResourceRoutes = require("./routes/information-resource");
const libraryRoutes = require("./routes/library");

const app = express();

sequelize
  .sync()
  .then(res => {
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

app.use("/", express.static(path.join(__dirname, "react app")));
app.use("/data", express.static(path.join(__dirname, "data")));

app.use("/users", userRoutes);
app.use("/informations", informationRoutes);
app.use("/information-resources", informationResourceRoutes);
app.use("/libraries", libraryRoutes);
// app.use("/library-resources", resourceRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "react app", "index.html"));
});

module.exports = app;
