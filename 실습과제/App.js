import logo from './logo.svg';
import './App.css'; // css적용
// import Fifth_clone_cording from './assignment/fifth_clone_coding';
import Fifth_homework from './component/fifth_homework';
import Fifth_clone_cording from './component/fifth_clone_coding';
// import 첫 대문자. from 파일명 그대로.

function App() {
  return (
    <div className="App">
      <h2 className="writer">6조 정인보 다섯 번째 실습과제</h2>
      <h1>하나.</h1>
      <h3>과제내용 : 과목의 성적을 입력할 경우 총점과 평균을 안내</h3>
       <Fifth_homework/> <br/><hr></hr>

      <h1>둘.</h1>
      <h3>과제내용 : 연산하길 원하는 두 수를 X와 Y에 입력한 뒤 덧셈 또는 뺄셈 결과 확인</h3>
       <Fifth_clone_cording/>


       
    </div>
  );
}

export default App;
