var express = require("express");
var app = express(); //서버생성완료

//http://127.0.0.1:5000/add?x=45&y=7
app.get("/add",(req, res)=>{ //GET방식 ?일 땐, req. 뒤에 query
   
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let z = parseInt(x) + parseInt(y);
    res.send({x:x, y:y, z:z}); //send로 사용하면 200 어쩌구 안붙여도 된다.
});

//http://127.0.0.1:5000/add/45/7
app.get("/add/:x/:y", (req, res)=>{ //GET방식 /슬래시일 땐, req. 뒤에 params
    console.log(req.params);
    
    let add={
        x : parseInt(req.params.x), 
        y : parseInt(req.params.y),
        
        };

    add.z = add.x + add.y;

    res.send(add);
    //res.send(add); //send함수를 이용해서 json데이터를 송신
    //send로 사용하면 200 어쩌구 안붙여도 된다.
});


app.listen(5000, ()=>{
    console.log("server start http://127.0.0.1:5000");
})

//get 방식 - ?x=4&y=5 로 사용하면 request.query.x 로 표기

//get 방식 - /4/5 로 사용하면  request.params.x 로 표기

//post 방식 - 미들웨어(app.use(express.urlencoded({extended:false})); 쓰기
//그 다음, request.body.x 로 표기