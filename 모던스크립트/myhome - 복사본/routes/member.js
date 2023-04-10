let express= require("express"); //node_modules폴더에 있으면 경로생략
let router = express.Router();
let commonDB = require("./commonDB") //node_modules폴더에 없으면 경로지정 필수
//    ./  나랑 같은폴더

// get home page 
router.get('/', function(req, res, next){
    res.render('member/member_register', {title : 'express'});
});
// 아이디 중복체크 -- 1. DB에가서 아이디를 받기
// 2. 받아온 아이디가 DB에 존재하는지 유무 확인(존재 시 사용자에게 fail처리)
// 3. 사용가능 시 사용자에게 success
router.use('/idcheck', async function(req, res, next){
    let userid = req.body.userid; //사용자 단에서 userid
    let sql = `select count(*) cnt from tb_member where userid='${userid}'`;
    let rows = await commonDB.mysqlRead(sql);
    let cnt = rows[0]["cnt"];
    if(cnt == 0)
        res.json({"result":"success"}) 
    else
    res.json({"result":"fail"})

});
// 회원가입 정보 저장
router.use('/save', async function(req, res, next){
    let userid = req.body.userid;
    let password = req.body.password;
    let username = req.body.username;
    let nickname = req.body.nickname;
    let email = req.body.email;
    let phone = req.body.phone;
    let zipcode = req.body.zipcode;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let sql = `insert into tb_member(userid, password, username,
             nickname, email, phone, zipcode, address1, address2, wdate)
             values(?,?,?,?,?,?,?,?,?, now())`;
    try{
    await commonDB.mysqlRead(sql, [userid, password, username,nickname, email, phone, zipcode, address1, address2]);
    res.json({"result":"success"});
    }
    catch(e)
    {
    console.log(e);
    res.json({"result":"fail"});
    }
});

// 로그인 페이지 불러오기
router.get('/login', async function(req, res, next){
    res.render("member/member_login");
});
// 로그인 성공여부 확인하고, 성공 시 post방식으로 서버에 정보 전달 > 그래야 해당 고객 로그인된 페이지가 나오니까.
router.post('/login', async function(req, res, next){
    let userid = req.body.userid;
    let password = req.body.password;
    let sql = `select * from tb_member where userid='${userid}'`;
    let result = await commonDB.mysqlRead(sql);

    if(result.length == 0)
    {
        res.json({"result":"fail", msg:"아이디가 존재하지 않습니다."})
        return;
    }
    if(result[0]["password"] != password)
    {
        res.json({"result":"fail", msg:"패스워드가 일치하지 않습니다."})
        return;
    }
    // 로그인 성공 정보 전달
    req.session["username"] = result[0]["username"];
    req.session["userid"] = result[0]["userid"];
    req.session["email"] = result[0]["email"];
    // 로그인 정보 잘 들어갔는지 콘솔창 찍어보기
    console.log(result[0]["username"]);
    console.log(result[0]["userid"]);
    console.log(result[0]["email"]);
    // 사용자에게 로그인성공 안내.
    res.json({"result":"success", msg:"로그인 성공!"});
});

router.get('/put', async function(req, res, next){
    let userid = req.body.userid;
    req.session["userid"] = userid;
    console.log(req.session["userid"]);
    
});

//로그아웃
router.get('/logout', async function(req, res, next){
    // 정보 초기화. ""
    req.session["userid"] = "";
    req.session["username"] = "";
    req.session["email"] = "";
   
    res.redirect("/") // 로그아웃 실시 후 index(메인 페이지)로 연동

   // req.session.destroy();
});

module.exports = router;