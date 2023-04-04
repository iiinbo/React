var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버생성완료
//bodyParse -- npm install bodyParser를 한 뒤 시도해야한다.
//새 버전에는 express가 가지고 있지만.
//POST로 전송할 때 request.body에 보낸 정보를 추가하여 사용 편리하게 도와주는 미들웨어다.
app.use(express.urlencoded({extended:false})); //미들웨어.

//html파일 불러오기. url뒤에 /input입력하면 가능
app.get("/input", (request, response)=>{
    fs.readFile("./html/input.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-Type":"text/html"})
        response.end(ejs.render(data));
    } )
  
})
//로그인.
app.get("/login", (request, response)=>{
       let userid = request.query.userid; //input 태그의 name(key값)속성을 의미함.(id x)
       let password = request.query.password;
       
       if(userid == "test" && password == "1234")
        response.send("login success");
        else
         response.send("login fail");
       
       
    })
//tip.로그인 완료 시 url주소는 아래처럼 나온다.
//http://127.0.0.1:5000/input?userid=test&password=1234

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>Express</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})