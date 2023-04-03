let http = require("http");

let server = http.createServer( (request, response) => {
    if(request.method == "POST"){
        //header가 먼저 가고 -> body가 간다.
        //body에서 오는 정보 수신하고
        let body = "";
        //request의 on "data", on은 "data", "end"라는 이벤트를 받는다고 보면 됨.
        request.on("data", (data) => {
            body += data;
            //body를 타고 오는 데이터를 계속 받는다. 무한정 데이터가 들어오기에 비동기식으로 계속 받는다.
        })
        //데이터 수신이 종료하면
        request.on("end", () => {
            //body 변수에 그동안 수신한 데이터가 있다.
            let postData = new URLSearchParams(body);

            let name = postData.get("name");
            let age = postData.get("age");

            let tmp = `<h1>post</h1>
                       <h3>${name} ${age}</h3>`;
            response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end(tmp)
        })

    }
    else{
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end("<H1>기본 서버입니다.</H1>")
    }
})

server.listen(6000, () => {
    console.log("server start http://127.0.0.1:6000")
});

//npm install nodemon