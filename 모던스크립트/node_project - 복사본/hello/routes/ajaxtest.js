var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ajaxtest');
});
/* test1. */
router.get('/ajaxtest1', function(req, res, next) {
  res.render('ajax/ajaxtest1');
});

router.get('/result1', function(req, res, next) {
  res.send('data만 보낸다.'); //send 함수 : 적당히 알아서 데이터만! 보낸다는 뜻
});


/* test2. */
//이 url을 입력하면 역으로 디버깅도 가능 http://127.0.0.1:3000/ajax/add?x=5&y=7
router.use('/ajaxtest2', function(req, res, next) {
  res.render('ajax/ajaxtest2');
});
// ajaxtest2.주소에서 *더하기* 버튼 누르면 연산결과 서버로 전송
router.use('/add', function(req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x+y;
  res.json({result:z}); //json 함수 :
});

// ajaxtest2.주소에서 *빼기* 버튼 누르면 연산결과 서버로 전송
router.use('/sub', function(req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x-y;
  res.json({result:z}); //json 함수 :
});

// ajaxtest2.주소에서 *곱하기* 버튼 누르면 연산결과 서버로 전송
router.use('/mul', function(req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x*y;
  res.json({result:z}); //json 함수 :
});
// ajaxtest2.주소에서 *나누기* 버튼 누르면 연산결과 서버로 전송
router.use('/div', function(req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x/y;
  res.json({result:z}); //json 함수 :
});
module.exports = router;
