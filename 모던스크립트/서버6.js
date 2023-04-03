let http = require("http");
let fs = require("fs"); //파일부르기
let url = require("url"); 
let server = http.createServer( (request, response) => {

    fs.readFile("./html/index.html", (error, data)=>{
        if(error)
        {
            response.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end("error"); //오류상황
            return;
        }
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(data); //정상이면 파일내용을 브라우저로 보낸다.

        })

    
        })

    
    


server.listen(5000, () => {
    console.log("server start http://127.0.0.1:5000")
});

//npm install nodemon