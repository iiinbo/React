var express = require("express");
var app = express(); //서버생성완료

//1-해당 url입력 시 구구단 나오도록 : http://127.0.0.1:4000/gugu?dan=4

//get 방식 - ?x=4&y=5 로 사용하면 request.query.x 로 표기
app.get("/gugu", (request, response)=>{
    let dan = request.query.dan;
    let result = "";
    for(i=1; i<=9; i++){
        result += `${dan} * ${i} = ${dan*i} <br/>`;
    }
    //페이지 화면 노출 전
    console.log(result); //콘솔창에 찍기
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end(result); //페이지 화면에 찍기 (end)
    //response.end("hello"); //end*2번 쓰면 에러발생.에러명 : Error [ERR_STREAM_WRITE_AFTER_END]: write after end
})

///////////////////
//2-http://127.0.0.1:4000/gugu/4

//get 방식 - /4/5 로 사용하면  request.params.x 로 표기 하고, "/블라/:블라블라"
app.get("/gugu/:dan", (request, response)=>{
    let dan = request.params.dan;
    let result = "";
    for(i=1; i<=9; i++){
        result += `${dan} * ${i} = ${dan*i} <br/>`;
    }
    //페이지 화면 노출 전
    console.log(result); //콘솔창에 찍기
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end(result); //페이지 화면에 찍기 (end)
    //response.end("hello"); //end*2번 쓰면 에러발생.에러명 : Error [ERR_STREAM_WRITE_AFTER_END]: write after end
})



app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>Express</h1>");
})

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})