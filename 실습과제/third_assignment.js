var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버생성완료

app.use(express.urlencoded({extended:false})); //미들웨어.

//html파일 불러오기.
//url뒤에 /clacform 입력 시 => 성적 인풋창 페이지로 이동
app.get("/calcform", (request, response)=>{
    fs.readFile("./실습과제/third.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-Type":"text/html"})
        response.end(ejs.render(data));
    } )
  
})
//계산하기.
app.get("/calc", (request, response)=>{
       let name = request.query.name;
       let kn = parseInt(request.query.kn); //input 태그의 name(key값)속성을 의미함.(id x)
       let en = parseInt(request.query.en);
       let mh = parseInt(request.query.mh);
       let sn = parseInt(request.query.sn);
       let sum = kn + en + mh + sn;
       let operator = parseInt(request.query.operator); //위에서 숫자형으로 전환 완료.
       
       if(operator == "1") //구하기
            response.send(`${name}님의 국어/영어/수학/과학 성적을 집계한 결과,<br/>
             총점 : ${sum} 점, 평균 : ${sum / 4} 점 입니다.`);
    
    })

//tip.add 등 완료 시 url주소는 아래처럼 나온다.
//http://127.0.0.1:5000/

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    response.end("<h1>성적 구하기 프로그램. url뒤에 /calcform을 입력하세요</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})