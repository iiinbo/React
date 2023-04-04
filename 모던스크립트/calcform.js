var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버생성완료
//bodyParse -- npm install bodyParser를 한 뒤 시도해야한다.
//새 버전에는 express가 가지고 있지만.
//POST로 전송할 때 request.body에 보낸 정보를 추가하여 사용 편리하게 도와주는 미들웨어다.
app.use(express.urlencoded({extended:false})); //미들웨어.

//html파일 불러오기.
//url뒤에 /clacform 입력하면, 인풋창 확인
app.get("/calcform", (request, response)=>{
    fs.readFile("./html/calcform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-Type":"text/html"})
        response.end(ejs.render(data));
    } )
  
})
//사칙연산하기.
app.get("/calc", (request, response)=>{
       let x = parseInt(request.query.x); //input 태그의 name(key값)속성을 의미함.(id x)
       let y = parseInt(request.query.y);
       let operator = parseInt(request.query.operator); //위에서 숫자형으로 전환 완료.
       
       if(operator == "1")
            response.send(`x값 : ${x} 과 y값 : ${y} 의 덧셈 결과는 ${x+y} 입니다.`);
        else if(operator == "2")
            response.send(`x값 : ${x} 과 y값 : ${y} 의 뺄셈 결과는 ${x-y} 입니다.`);
        else if(operator == "3")
            response.send(`x값 : ${x} 과 y값 : ${y} 의 곱셈 결과는 ${x*y} 입니다.`);
        else
            response.send(`x값 : ${x} 과 y값 : ${y} 의 나눗셈 결과는 ${x/y} 입니다.`);
    })

//tip.add 등 완료 시 url주소는 아래처럼 나온다.
//http://127.0.0.1:5000/calc?operator=4&x=20&y=150

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    response.end("<h1>x와 y의 값 연산 페이지. url뒤에 /calcform을 입력하세요</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})