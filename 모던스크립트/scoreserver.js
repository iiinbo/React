let http = require("http");
let fs = require("fs"); //파일부르기
let ejs = require("ejs"); //npm install ejs

let scoreData = [
    {name : "홍길동", kor:90, eng : 90,  mat:100, sum:0, avg:0},
    {name : "임꺽정", kor:80, eng : 60,  mat:60, sum:0, avg:0},
    {name : "장길산", kor:70, eng : 70,  mat:80, sum:0, avg:0},
    {name : "강감찬", kor:80, eng : 90,  mat:90, sum:0, avg:0},
    {name : "이순신", kor:100, eng : 100,  mat:100, sum:0, avg:0}
   
];

let server = http.createServer( (request, response) => {
    // ./ : 의미는 나랑 같은 폴더 , ../ 상위폴더
    fs.readFile("./html/score.html", "utf-8", (error, data)=>{
        if(error)
        {
            response.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end("error"); //오류상황
            return;
        }
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
           scoreData:scoreData
           
        })); //정상이면 파일내용을 브라우저로 보낸다.

        //ejs 템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다.
        })
        
    })
server.listen(5000, () => {
    console.log("server start http://127.0.0.1:5000")
});

//npm install nodemon