const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const route = require("./routes/urlRoutes");
const PORT = process.env.PORT || 6000 || 8000;

const path = require('path')
const cookieParser = require('cookie-parser')
app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))
app.use(cookieParser())


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./config/db");
connectDB();

app.use("/url", route);

app.listen(PORT, () => {
  console.log(`server is listening on : ${PORT}`.bgBlack.green);
});
