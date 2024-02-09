const path = require("path");
const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const categoryRoutes = require("./routes/category");
const transactionRoutes = require("./routes/transaction");

const cors = require("cors");
const app = express();
app.use(cors());

mongoose.set("strictQuery", false);
//conection to data
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/file-folder", express.static(path.join("file-folder")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
