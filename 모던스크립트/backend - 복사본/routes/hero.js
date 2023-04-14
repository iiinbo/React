var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB'); // 하나. DB에서 가져올 준비 

// 1- db정보  출력하기
router.get('/list', async function(req, res, next) {
//둘. DB정보 : sql문으로 select(가져오기)
let sql =
`SELECT A.id, A.heroname, A.herodescr, DATE_FORMAT( A.wdate, '%Y-%m-%d')wdate
from tb_hero A`;

//셋. mysqlRead : 정보가져오는 함수.
let results = await commonDB.mysqlRead(sql, []);
res.json(results);
});

// 2- 작성한 정보 db로 insert 저장하기(post)
router.post('/write', async function(req, res, next){
  try{
   let heroname = req.body.heroname;
   let herodescr = req.body.herodescr;
   let sql = `INSERT INTO tb_hero ( heroname, herodescr, wdate)
   VALUES(?,?, NOW())`;
   await commonDB.mysqlRead(sql, [heroname, herodescr]);
   res.json({"result" : "success"});
   }
   catch(e){
    console.log(e);
    res.json({"result" : "fail"});
   }
 })
 //상세보기
 //http://localhost:9090/hero/view/1
 router.get('/view/:id', async function(req, res, next){
  try{
    let id = req.params.id;
   let sql = `select * from tb_hero where id=${id}`;
   let results = await commonDB.mysqlRead(sql, []);

   res.json({"result" : "success", "hero" : results[0]});
   }
   catch(e){
    console.log(e);
    res.json({"result" : "fail"});
   }
 })
 
//수정하기
 //http://localhost:9090/hero/view/1
 router.post('/update', async function(req, res, next){
  try{
   let id = req.body.id;
   let heroname = req.body.heroname;
   let herodescr = req.body.herodescr;
   let sql = `update tb_hero set heroname=?,
                                 herodescr=?, where id=?`;
   await commonDB.mysqlRead(sql, [heroname, herodescr, id]);

   res.json({"result" : "success"});
   }
   catch(e){
    console.log(e);
    res.json({"result" : "fail"});
   }
 })

module.exports = router;
