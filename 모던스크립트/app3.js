var express = require("express");
var app = express(); //서버생성완료

//post방식일 땐 아래 꼭 필독~~
//postman에서 해본다.
//bodyParser 모듈을 설치해서 사용하면 된다. => express자체보유중인데 버전이 낮으면 별도 설치 필요
//body에 데이터를 가져오기 위해 아래 한 줄을 입력해야함.

//app 객체 만들고 url처리 전 한번만 써주면 됨. *미들웨어*
app.use(express.urlencoded({extended:false})); //미들웨어라고 함.

app.post("/add", (req, res)=>{
    let x = req.body.x;
    let y = req.body.y;
    let z = parseInt(x) + parseInt(y);
    
    res.send({x:x, y:y, z:z});
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>Express</h1>");
})

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})

//get 방식 - ?x=4&y=5 로 사용하면 request.query.x 로 표기

//get 방식 - /4/5 로 사용하면  request.params.x 로 표기

//post 방식 - 미들웨어(app.use(express.urlencoded({extended:false})); 쓰기
//그 다음, request.body.x 로 표기