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
    sql = `insert into tb_board(title, writer, contents, wdate) 
            values(?,?,?,now())`;
    let params = ['제목2','임꺽정','내용2'];

    //insert 시도
    connetion.query(sql, params, (err, rows)=>{
        if(err){
        console.log( "err" );
        }
        else{
        console.log("insert 성공");
        //connetion.release(); //연결 해제 
        }
    })
    //select 시도
    sql = `select * from tb_board`;
    connetion.query(sql, params, (err, rows)=>{
        if(err){
        console.log( "err" );
        console.log( rows );
        }
        
    })
})
console.log("end");

// 비동기식 처리 => 동기식 처리로 사용할 수 있게 해주는 것.
// 제작코드(가수) / 소비코드(팬) / 프라미스(앨범구독리스트) 총 3개로 구성되어있음.
