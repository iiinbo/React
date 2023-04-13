var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB'); // 하나. DB에서 가져올 준비 


//1- list 조회
router.get('/list', async function(req, res, next) {
    //둘. DB정보 : sql문으로 select(가져오기)
    let sql =
    `SELECT A.id, A.st_name, A.kor, A.eng, A.mth, DATE_FORMAT( A.wdate, '%Y-%m-%d')wdate
    FROM score_board A`;
    
    //셋. mysqlRead : 정보가져오는 함수.
    let results = await commonDB.mysqlRead(sql, []);
    res.json(results);
    });
    



module.exports = router;
