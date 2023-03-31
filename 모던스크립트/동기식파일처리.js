//동기식 파일처리하기
//파일을 모두 읽고나서 리턴한다.

var fs = require("fs");
//require : 외부모듈을 프로그램 안으로 불러들인다.
//주의사항! java의 import 와 유사주의.
    //임포트는 라이브러리를 메모리로 불러들이는게 아닌, 라이브러리 이름을 짧게 썼을 때
    //본래 긴 이름을 제시해주는 역할
    //import.java.util.list

    // List<String> list; 라고 쓰면 List의 풀네임을 써야 정확한 표기법.
    // java.util.List<String>~ 라고 쓰면 너무 길어서
    // 앞을 짧게 쓰고, 전체 풀네임을 import구문으로 확인하라는 의미로 해석.

//아래 동기모드 함수(readFileSync) : 반환값에 파일의 내용이 온다.
var data = fs.readFileSync("./hello.js", "utf-8");
console.log(data);
console.log("프로그램 종료!");