var express = require("express");
var app = express(); //서버생성완료

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>Express</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})