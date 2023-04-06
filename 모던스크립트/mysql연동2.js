var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit : 10,
    host:"127.0.0.1",
    user : "user01",
    password:"1234",
    database:"mydb",
    port:3306
});

//DB와 연결
pool.getConnection( (err, connetion)=>{
    //DB와 연결 성공 시 매개변수로 전달된 함수 호출된다.
    //err - DB 연결실패 시 처리된다.
    if(err){
        console.log(err);
        return;
    }
    //연결 성공 시 connection을 전달한다. 
    //연결 객체
    console.log("connection success");
    

//////////////////   
//** 프라미스 만들기 **
new Promise( (resolve, reject)=>{
        
        sql = `insert into tb_board(title, writer, contents, wdate)
                values(?,?,?,now())`;

let params = ['제목3','임꺽정3','내용3'];

//1- insert먼저 해주고
    connetion.query(sql, params, (err, rows)=>{
            if(err){
                reject("오류");
            }
            else{
                resolve("성공!"); //then 구문으로 이동한다.
            }
        })
    })
    .then( (result)=>{//2- 완료되면 그 다음 select 하기
        sql = "select * from tb_board";
         connetion.query(sql, (err, rows)=>{
           if(err)
                console.log( "err" );
             console.log( rows );
         
         })
    })
    .catch( (error)=>{
        console.log(error);
    })

  

})
console.log("end");
