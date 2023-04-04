var express = require("express");
var app = express(); //서버생성완료


app.use("/a", (request, response, next)=>{
    //미들웨어*
    //request : 브라우저 -> 서버 정보 보낼 때
    //response : 서버 -> 브라우저(클라이언트)로 보낼 때
    //next : 다음 함수 호출하는 것
    request.name="홍길동";
    response.name="아마존"; //response로 새로운 값 추가 가능.
    console.log("첫번째 미들웨어");
    
    next(); //바로 밑 함수까지 주욱 호출해줘
})


app.use( (request, response, next)=>{
    console.log("두번째 미들웨어");
    request.phone="01022223333";
    request.address="성수성수";
    next(); //여기서부터 또 바로 밑 함수까지 호출해줘
})


app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    console.log(request.name);
    console.log(response.name);
    console.log(request.phone);
    console.log(request.address);

    response.end("<h1>미들웨어 : 콘솔창 보면, aaaa다음에 커서로 무언가 공간이 있음.</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})