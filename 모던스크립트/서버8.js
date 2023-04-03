let http = require("http");
let fs = require("fs"); //파일부르기
let ejs = require("ejs"); //npm install ejs

let boardList = [
    {id:1, title:"제목1", writer:"inbo", wdate:"2023-04-30"},
    {id:2, title:"제목2", writer:"inbo2", wdate:"2023-04-31"},
    {id:3, title:"제목3", writer:"inbo3", wdate:"2023-04-29"},
    {id:4, title:"제목4", writer:"inbo4", wdate:"2023-04-28"}
];

let server = http.createServer( (request, response) => {
    // ./ : 의미는 나랑 같은 폴더 , ../ 상위폴더
    fs.readFile("./html/test2.html", "utf-8", (error, data)=>{
        if(error)
        {
            response.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end("error"); //오류상황
            return;
        }
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            boardList:boardList
        })); //정상이면 파일내용을 브라우저로 보낸다.

        //ejs 템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다.
        })

    
        });
server.listen(5000, () => {
    console.log("server start http://127.0.0.1:5000")
});

//npm install nodemon