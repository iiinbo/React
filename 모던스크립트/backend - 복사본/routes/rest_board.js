let express= require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");


// get home page 

//1. 리스트보기
router.get('/list', async function(req, res, next){
    let sql = `select id, title, writer,
            contents, date_format(wdate, '%Y-%m-%d') wdate 
            from tb_board`;

    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', {boardList:results});
});


// http://localhost:9090/rest_board/list/1 -- 정상접속
// http://localhost:9090/rest_board/list/ -- 접속 불가 url이 정상
//1-1. 로그인 완료고객 : 본인 게시글 리스트 보여주기(?)
router.get('/list/:pg', async function(req, res, next){

    //pg : 다음 페이지로 넘어가는데 사용할 수 있게 선언하고, limit에서 사용
    // pg =1 : 0 표현 : (pg-1)*10 = 0
    // pg =2 : 10 : (2-1)*10 = 10 ...
    let pg = parseInt( req.params.pg );

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
    // 한 함수 내에서 res.json 호출 -> 또 다시 res.send / render / json 호출 불가.
    // + totalCnt 도 추가. +pg도 추가
    res.json( {boardList:results, // 현재 페이지정보
                totalCnt:totalCnt, // 토탈 카운트
                pg:pg });
});

//2. view는 상세보기 
router.use("/view/:id", async function(req,res, next){
    let id = req.params.id; //tip. 게시판 작성된 글 상세보기를 위해, key값(id)를 가지고 있어야 해.
    let sql = `SELECT A.id, A.title, A.writer,
                date_format(a.wdate, '%Y-%m-%d') wdate,
                (select username from tb_member B where A.writer=B.userid) username
                from tb_board A
                where id = ${id}
                `;
                // tip. 검색 종류
                        // n번 비교 - 선형검색
                        // 순서가 있는 데이터 - 이진검색
                        // 빠른 작업속도 - 해쉬(hash)검색
    let results = await commonDB.mysqlRead(sql, []);
    if(results.length == 0)
    {
        res.json({result : "fail", Msg:"해당 데이터를 찾을 수 없습니다."});
        return;
    }
    res.json( {result : "success", Msg:"", boardData:results[0]});
    });


//3. 글 저장하기
// http://localhost:9090/rest_board/save
// {title : "제목", writer:"test", contents:"내용"}
// 응답 성공 시 result : "success", msg : "응답성공"
// 응답 실패 시 result : "fail", msg : "응답실패"
router.post("/save", async function (req,res, next){
    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;

    let sql = `INSERT INTO tb_board(TITLE, WRITER, CONTENTS, WDATE)
                VALUES(?,?,?, NOW())
                 `;

    let results = await commonDB.mysqlRead(sql, [title, writer, contents]);
    if(results.length == 0)
    {
        res.json({result : "fail", Msg:"등록 실패."});
        return;
    }
    res.json( {result : "success", Msg:"등록 성공", boardData:results[0]});
})

//4. 글 작성하기(선생님이 작성해준 방식. 언제든 참고 가능)
router.post("/write", async function (req,res, next){
    // 아래처럼 작성해본 이유는, commonUtil에서, 에러 발생 시 나오는 값들을
    // 한번에 쉽게 작성할 수 있기 때문에 샘플로 작성해주셨다.
    checkInfos=[
        {  key:"title", type: "str", range:200  }, //해당 key값은 스트링이고, 글자길이는 200까지로 제한된다.
        {  key:"writer", type: "str", range:40  },
        {  key:"contents", type: "str", range:-1  },]

    // 수행결과값이 0이면, 문제없음. 다른 숫자가 오면 오류
    insertInfo = commonUtil.checkInfo( req, checkInfos);
    if( insertInfo["result"] != 0)
    {
        res.json(insertInfo);
        return;
    }
    //
    // 글을 쓸 수 있는 사람은, member 에 정보가 있는 고객만.(id가 있는 사람만 가능하도록)
    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;
    let sql = `select count(*) cnt
                from tb_member where userid='${writer}'`;  // member테이블 칼럼 userid정보가 있는 고객이름을, 글쓰기할 때 입력해야 정상 업로드.
    results = await commonDB.mysqlRead(sql, []);
    if(results[0]["cnt"] == 0) //id 없으면 글 작성 시 에러
    {
        res.json({result:"fail", msg : "해당하는 아이디가 없습니다."})
        return; //fail이면 return 해줘야, 아래로 안내려감.(else 지양)
    }

    //insert 해보자.
    sql = `insert into tb_board(title, writer, contents, wdate)
            values('${title}','${writer}','${contents}', now())`;
    await commonDB.mysqlRead(sql, []);

    res.json({"result" : "success"});

})


module.exports = router;