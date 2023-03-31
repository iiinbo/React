    let http = require("http");
    let fs = require("fs"); //파일읽기
    let url = require("url"); //url분석을 위한 라이브러리

    //http:127.0.0.1:5000?name=Tom&age=17
   let server = http.createServer( (request, response) => {
        console.log(request.url);   //전송url
        console.log(request.method); //전송방식 
    
        let rurl = request.url;
        let query = url.parse(rurl, true).query; //string 분석 -> json객체로 전환
        //이를 파싱한다 라고 표현.
        console.log(query);

        if(query.name!="")
        {
        response.writeHead(200, {'Content-Type' : 'text/html;charSet=utf-8'});//content-type {}는 이미 만들어져있는 json이다!
        response.end(`이름 : ${query.name} 나이: ${query.age}`)
        }
    })
    
    server.listen(5000, () => { //listen : 포트번호.
        console.log("server start http://127.0.0.1:5000")
    });

    //npm