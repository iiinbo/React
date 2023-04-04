var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버생성완료

app.use(express.urlencoded({extended:false})); //미들웨어.

////html파일 불러오기.
//url뒤에 /gugudan 입력하면, 인풋창 확인
app.get("/gugudan", (request, response)=>{
    fs.readFile("./html/불멸의구구단.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-Type":"text/html"})
        response.end(ejs.render(data));
    } )
  
})

app.get("/gugu", (request, response)=>{
    let dan = parseInt(request.query.dan);
    let operator = parseInt(request.query.operator); //위에서 숫자형으로 전환
    let result = "";
        if(operator == "1"){
            for(i=1; i<=9; i++){
             result += `${dan} * ${i} = ${dan*i} <br/>`;
            }
            response.send(result);
    }
    })




app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>Express</h1>");
})

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})