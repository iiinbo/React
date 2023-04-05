//js파일 만들었다면, 베이스 가져오기(6개) *js파일은 모던스크립트 파일 안에 넣어야 함. (안그럴경우 모듈 not found)
var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버생성완료

app.set("view engine", ejs); //0. 서버생성한 뒤 - ejs엔진은 views 폴더 아래서 파일을 한번에 검색한다. 
app.use(express.urlencoded({extended:false})); //0. 서버 생성한 뒤 - 미들웨어

//0. 현재 데이터가 없으므로, 아래처럼 만들어서 사용한다.
let scoreData = [
    {id:1, name:"홍길동", kor:90, eng:80, mat:100}
];

//*url은 서버 전체 통틀어서 유일해야 한다!*

//1. list는 페이지목록보기
app.get("/score/list", (req,res)=>{
    res.render("score/score_list.ejs", {scoreList:scoreData}) //res 객체 <= render함수를 익스프레스가 추가해줬다.
})
//2. view는 상세보기 
app.get("/score/view/:id", (req,res)=>{
    let id = req.params.id; //tip. 게시판 작성된 글 상세보기를 위해, key값(id)를 가지고 있어야 해.
    //유사방법 : scoreData.filter(score => score.id==id); //filter - 조건 만족하는 모~든 데이터 배열 모두 다가져와
    let scoreItem = scoreData.find(score => score.id==id); //find - 조건 만족하는 첫번 째 데이터만 가져와!
    res.render("score/score_view.ejs", {score:scoreItem});
})

//3. write는 작성하기. 버튼 클릭 > 작성페이지 연동
app.get("/score/write", (req,res)=>{
    res.render("score/score_write.ejs"); //render함수로 페이지 이동 손쉽게 가능. 
})


//4. save저장하기만 post로 해주기. (=바디와 헤드 따로가는 방식)
app.post("/score/save", (req,res)=>{
    let name = req.body.name;
    let kor = parseInt(req.body.kor);
    let eng = parseInt(req.body.eng);
    let mat = parseInt(req.body.mat);
    let id = 0; //가장 마지막 글번호는 항상 현재누적된 글보다 1 많아야 하므로.
    //그다음 json으로 데이터 만든 뒤 배열에 추가.
    id = scoreData[scoreData.length-1].id+1;

    data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
    scoreData.push( data );
    //redirect 함수. 작성한 글 저장 > 리스트에 반영해준다.
    res.redirect("/score/list"); 

})

//삭제하기 test 중 post방법
app.post("/score/del", (req,res, next)=>{
   


})

//index(=메인페이지) : 하이퍼링크처럼 index 페이지에서 특정 버튼 클릭하면 연동되어있는 페이지로 이동할 수 있는 기능 부여**
app.use("/", (request, response)=>{
    response.render("index.ejs"); //render함수. //index.ejs파일 위치 : views 폴더.(score폴더 아님)
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html"})
    response.end("<h1>404 Error화면일 경우 표출</h1>");
})

app.listen(4000, ()=>{
    console.log("server start http://127.0.0.1:4000");
})