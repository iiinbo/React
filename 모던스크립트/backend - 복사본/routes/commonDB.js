//board.js에서 DB접근. member.js에서도 DB접근 -- DB 내 데이터 읽기/쓰기 전문코드.

var mysql = require("mysql");
//db정보
const DBInfo ={
    connectionLimit:10,
    host:"localhost",
    user:"user01",
    password:"1234",
    database:"mydb",
    port:3306
}

let readpool = mysql.createPool(DBInfo); //
async function mysqlRead(sql, params){
    let promise = new Promise( (resolve, reject)=>{
        readpool.getConnection( (err, conn)=>{
            if(err)
        {
            console.log(err);
            reject(err);
        }

        conn.query(sql, params, (err, rows)=>{
            console.log( sql );
            console.log( rows );
            if(err)
            reject(err);
            else{
                resolve(rows);
                conn.release();
                }
        });
    });
});
  await promise;
  return promise;  
        

}
exports.mysqlRead = mysqlRead;
exports.DBInfo = DBInfo; //DB정보 바뀌면 저장될 수 있도록.