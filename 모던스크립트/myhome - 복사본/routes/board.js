let express= require("express");
let router = express.Router();
let commonDB = require("./commonDB");

// get home page 
router.get('/', async function(req, res, next){
    let sql = `select id, title, writer,
            contents, date_format(wdate, '%Y-%m-%d') wdate 
            from tb_board`;

    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', {boardList:results});
});
//1. 리스트보기
router.get('/list', async function(req, res, next){
    let sql = `select id, title, writer,
            contents, date_format(wdate, '%Y-%m-%d') wdate 
            from tb_board`;

    let results = await commonDB.mysqlRead(sql, []);
    res.render('board/board_list', {boardList:results});
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