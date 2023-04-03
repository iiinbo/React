var express = require("express");
var app = express(); //서버생성

//express 모듈은 use / get / post 함수 3개가 있다.
//use - get이든 post든 둘 다 처리 가능
//get- get방식으로 온 것만 처리.
//post - post방식으로 온 것만 처리.

//tip. 서버주소 맨 끝에 /test라고 치면 아래처럼 test가 화면에 나오고ㅡ 안쓰면 두번째 페이지가 나온다.
//get방식으로 시도
app.get("/get",(request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>get</h1>");
})

app.get("/userinfo", (req, res)=>{
    let userinfo={name:"tom", "phone" : "010.2222.3333"};
    res.send(userinfo); //send함수를 이용해서 json데이터를 송신
})

//http://127.0.0.1:5000/userinfo2?name=Jane&phone=01000000000
app.get("/userinfo2", (req, res)=>{
    console.log(req.query);
    
    let userinfo={
        name:req.query.name, 
        phone : req.query.phone};
    res.send(userinfo); //send함수를 이용해서 json데이터를 송신
})

//새로운 get url방식
//http://127.0.0.1:5000/userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (req, res)=>{
    console.log(req.params);
    
    let userinfo={
        username : req.params.username, 
        userid : req.params.userid};
    res.send(userinfo); //send함수를 이용해서 json데이터를 송신
})

//post방식으로 시도
app.use("/post",(request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>post</h1>");
})


//다른 url처리가 없을 때 아래처럼 처리한다.
app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>Express</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})