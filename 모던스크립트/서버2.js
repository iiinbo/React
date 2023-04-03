    let http = require("http");

   let server = http.createServer(
    //브라우저http://127.0.0.1:4000 서버로 액세스 요청이 들어오면 request 함수가 호출되는 것이다.
    //브라우저에서 요청한 정보를 담는 객체가 request
    //서버가 클라이언트로 정보를 보낼 때 담는 객체가 response
     
    (request, response) => {
        response.writeHead(200, {'Content-Type' : 'text/html;charSet=utf-8'});//content-type {}는 이미 만들어져있는 json이다!
        response.end("<H1>두번째 서버다.</H1>")
    })
    
    server.listen(4000, () => { //listen : 포트번호.
        console.log("server start http://127.0.0.1:4000")
    });

    //npm