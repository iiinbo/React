    let http = require("http");

   let server = http.createServer( (request, response) => {
        response.writeHead(200, {'Content-Type' : 'text/html;charSet=utf-8'});//content-type {}는 이미 만들어져있는 json이다!
        response.end("<H1>두번째 서버다.</H1>")
    })
    
    server.listen(4000, () => { //listen : 포트번호.
        console.log("server start http://127.0.0.1:4000")
    });

    //npm