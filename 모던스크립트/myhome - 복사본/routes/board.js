let express= require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");


// get home page 
// router.get('/', async function(req, res, next){
//     let sql = `select id, title, writer,
//             contents, date_format(wdate, '%Y-%m-%d') wdate 
//             from tb_board`;

//     let results = await commonDB.mysqlRead(sql, []);
//     res.render('board/board_list', {boardList:results});
// });
//1. 리스트보기
router.get('/list', async function(req, res, next){
    let sql = `select id, title, writer,
            contents, date_format(wdate, '%Y-%m-%d') wdate 
            from tb_board`;

    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', {boardList:results});
});
//1-1. 로그인 완료고객 : 본인 게시글 리스트 보여주기(?)
router.get('/list/:pg', async function(req, res, next){

    //pg : 다음 페이지로 넘어가는데 사용할 수 있게 선언하고, limit에서 사용
    // pg =1 : 0 표현 : (pg-1)*10 = 0
    // pg =2 : 10 : (2-1)*10 = 10 ...
    let pg = req.params.pg;

    // mysql에서 만든 쿼리 그대로 복붙.
    // count(*) 쿼리 줘서 정렬한 데이터의 개수 가져오기
    let sql = `
            SELECT count(*)	cnt
            FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
            LEFT OUTER JOIN tb_member C ON A.writer = C.userid
            `;
    let results = await commonDB.mysqlRead(sql, []);
    let totalCnt = results[0]["cnt"];
    // 쿼리로 정렬한 데이터 나열.
    sql = `SELECT A.id, A.title, A.writer, A.num, A.username
    ,date_format(A.wdate, '%Y-%m-%d') wdate
        FROM(
            SELECT A.id, A.title, A.writer, A.wdate, C.username
            , @rownum:=@rownum+1 num	
            FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
            LEFT OUTER JOIN tb_member C ON A.writer = C.userid
            ORDER BY id DESC
            )A
            LIMIT ${(pg-1)*10}, 10`; // pg 선언한 곳에 설명 있음.(10개마다 다음페이지로)

    results = await commonDB.mysqlRead(sql, []);
    // 로그인 고객의 정보도 페이지에서 필요할 경우 session에 대한 값도 받아야 한다.
    // + totalCnt 도 추가. +pg도 추가
    // +getPaging도 추가. *추가하기 전, 맨 상단에 commonUtil 선언.
    res.render('board/board_list', {session:req.session, boardList:results, totalCnt:totalCnt,
                                    pg:pg,
                                    paging:commonUtil.getPaging(pg, totalCnt) });
});

//2. view는 상세보기 
router.use("/view/:id", async function(req,res, next){
    let id = req.params.id; //tip. 게시판 작성된 글 상세보기를 위해, key값(id)를 가지고 있어야 해.
    let sql = `select id, title, writer,
        contents, date_format(wdate, '%Y-%m-%d') wdate 
        from tb_board`;
    let results = await commonDB.mysqlRead(sql, []);
    let item = results.filter(x=>x.id==id);

    //let sql = `select * from tb_board where id=${id}`;
    
    res.render('board/board_view.ejs', {item:item[0]});
    });

module.exports = router;