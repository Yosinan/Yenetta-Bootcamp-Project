const express = require("express");
const start = require('./database');
const productRouter = require("./routes/productRoute");
const statusRouter = require('../api/routes/status')

const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

// start database connection
start();


app.use(express.static("static"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', productRouter);
app.use('/', statusRouter);


module.exports = app;
