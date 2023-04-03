    let http = require("http");

   let server = http.createServer( (request, response) => {
        response.writeHead(200, {'Content-Type' : 'text/html;charSet=utf-8'});//content-type {}는 이미 만들어져있는 json이다!
        response.end("<H1>기본 서버에 접속되었습니다.</H1>")
    })
    
    server.listen(4000, () => {
        console.log("server start http://127.0.0.1:4000")
    });

