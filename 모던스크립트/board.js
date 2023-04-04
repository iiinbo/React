var express = require("express");
var fs = require("fs");
var ejs = require("ejs");
const { title } = require("process");

var app = express(); //서버생성완료
app.set("view engine", ejs); //ejs엔진은 views 폴더 아래서 파일을 한번에 검색한다. 

app.use(express.urlencoded({extended:false})); //미들웨어

let boardList = [
    {id:1, title:"부트스트랩 이용 꿀팁 공유", writer:"정인보", wdate:"2023-04-01"},
    {id:2, title:"영화홍보", writer:"수지", wdate:"2023-04-02"},
    {id:3, title:"하나도부럽지가않엉", writer:"장기하", wdate:"2023-04-03"},
    {id:4, title:"새로운 노래 홍보", writer:"아이유", wdate:"2023-04-05"},
    {id:5, title:"반바지 박보검", writer:"박보검", wdate:"2023-04-07"}
];
//게시판보기. url뒤에 /board/list 입력하기.
app.use("/board/list", (request, response)=>{
    response.render("board/board_list.ejs", {boardList:boardList}); //이 내용을 적으면 ejs파일을 읽는다.
})
//게시판에서 글 상세보기. 제목 클릭 시 페이지 이동.
app.use("/board/view/:id", (request, response)=>{
    let id = request.params.id;
    let item = boardList.filter(x=>x.id==id);
    response.render("board/board_view.ejs", {item:item[0]}); //filter는 배열로오므로.
})

//게시판에서 글 적기.  페이지 이동만 한다. (저장은 따로)
app.use("/board/write", (request, response)=>{
    response.render("board/board_write.ejs"); 
})

//게시판에서 글 저장하기.
app.use("/board/save", (request, response)=>{
    let title = request.body.title;
    let contents = request.body.contents;
    let wdate = request.body.wdate;
    let writer = request.body.writer;
    let id = boardList.length+1;

    //push해주고
    boardList.push({id:id, title:title, contents:contents, writer:writer, wdate:wdate});
    //웹에선, 함수를 직접 호출해주지말고(많은 함수들이 엮어있으므로.)
    //*redirect : 페이지 강제 이동
    //등록 후 리스트 페이지로 강제 이동한다는 의미.
    response.redirect("/board/list"); 
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    response.end("<h1>부트스트랩 이용하기</h1>");
})

app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})