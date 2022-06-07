"use strict";

// 모듈
const express = require('express');
const app = express();

//앱세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");


// 라우팅
const home = require("./src/routes/home");

app.use(express.static('./src/public'))

app.use("/", home);  //use >> 미들웨어를 등록해주는 메소드

module.exports = app;