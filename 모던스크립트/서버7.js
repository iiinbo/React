let http = require("http");
let fs = require("fs"); //파일부르기
let ejs = require("ejs"); //npm install ejs

let server = http.createServer( (request, response) => {
    // ./ : 의미는 나랑 같은 폴더 , ../ 상위폴더
    fs.readFile("./html/test.html", "utf-8", (error, data)=>{
        if(error)
        {
            response.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end("error"); //오류상황
            return;
        }
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(ejs.render(data, {
            name : "홍길동", 
            age : 27, 
            address : "성수알파코",
            limit : 10
        })); //정상이면 파일내용을 브라우저로 보낸다.

        //ejs 템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다.
        })

    
        })

    
server.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000")
});

//npm install nodemon