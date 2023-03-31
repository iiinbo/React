    let http = require("http");
    let fs = require("fs"); //파일읽기
    let url = require("url"); //url분석을 위한 라이브러리

    //http:127.0.0.1:5000/add?x=4&y=5
   let server = http.createServer( (request, response) => {
        //console.log(request.url);   //전송url
        console.log(request.method); //전송방식 : GET
    
        let rurl = request.url;
        let pathname = url.parse(rurl, true).pathname; //: add
        let query = url.parse(rurl, true).query; //string 분석 -> json객체로 전환 //출력 : {x:4, y:5}
        //이를 파싱한다 라고 표현.
        console.log(query); //출력
        console.log(pathname); //출력
        console.log(typeof(query)); //출력

        if(pathname == "/add")
        {
        response.writeHead(200, {'Content-Type' : 'text/html;charSet=utf-8'});//content-type {}는 이미 만들어져있는 json이다!
        let x = parseInt(query.x);
         let y = parseInt(query.y);
        let z = x+y;
        response.end(`결과 : ${x} + ${y} = ${z}` );
        }else{
            response.writeHead(404, {'Content-Type' : 'text/html;charSet=utf-8'});
            response.end("<h1>존재하지 않는 url입니다. </h1>"); 
        }
    })
    
    server.listen(5000, () => { //listen : 포트번호.
        console.log("server start http://127.0.0.1:5000")
    });

    //npm