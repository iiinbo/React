let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");

//0. 메인('/') : 아직 없음
router.get('/', function(req, res, next){
    res.render('board/board_list_self', {title : 'express'});
});

// 1. 게시판 페이지(get방식)
router.get('/list', async function(req, res, next){
    let sql = `select id, title, writer,
                date_format(wdate, '%Y-%m-%d') wdate, hit
                from st_board`; //테이블명 유의! 스타프렌즈 게시판보드임.

    // 게시판 행 출력결과 = DB정보를 mysql로 읽어올거다.[배열로 담아]
    let result = await commonDB.mysqlRead(sql, []);

    // board_list_self.ejs파일 위치는 routes 폴더보다 하위. /생략
    res.render('board/board_list_self', {boardList : result});
})


module.exports = router;