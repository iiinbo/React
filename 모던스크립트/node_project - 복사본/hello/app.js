var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //메인페이지
var usersRouter = require('./routes/users');
var guestRouter = require('./routes/guestbook'); //**모듈을 메모리로 가져와서 guestbook 추가했다.
var ajaxRouter = require('./routes/ajaxtest'); //**모듈을 메모리로 가져와서 ajaxtest도 추가했다. */

var app = express();

// view engine setup(환경변수 설정)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 미들웨어들 사용 나열
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//테스트
console.log( __dirname );
console.log( path.join(__dirname, 'public') );

app.use(express.static(path.join(__dirname, 'public')));
//path.join : path 라이브러리이다. 전체 디렉토리 경로를 만들어준다는 의미이다. (= C:/temp/public)
//node.js가 언더바 2개로 시작하는 변수 또는 함수 => 내장변수이다. (=node만든사람이 만들어둔.)
//__dirme : 현재 디렉토리 경로를 가지고 있다는 의미.(내장변수)
app.use('/', indexRouter);
app.use('/users', usersRouter);
//**추가. url : /guestbook으로 시작할 경우  guestRouter 가 처리할 예정이다.*/
app.use('/guestbook', guestRouter);
app.use('/ajax', ajaxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//개발환경 셋팅을 위해 커멘드 프롬프트에다가 칠 것.
//npm install nodemon
//npm install -g nodemon
//nodemon start