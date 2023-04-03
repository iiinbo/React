    let http = require("http");
    let jade = require("jade");
    let fs = require("fs");

   let server = http.createServer( (request, response) => {
    fs.readFile("html/test.jade", "utf-8", (error, data)=>{

        let fn = jade.compile(data);

        response.writeHead(200, {'Content-Type' : 'text/html;charSet=utf-8'});//content-type {}는 이미 만들어져있는 json이다!
        response.end(fn({name:"jade"}));
    });
    })
    
    server.listen(5000, () => {
        console.log("server start http://127.0.0.1:5000")
    });

