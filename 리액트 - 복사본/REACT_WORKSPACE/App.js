import logo from './logo.svg';
import './App.css'; // css적용
import Mycomponent1 from './component/mycomponent1';
import Appclass from './component/Appclass'; //js파일 추가되면 여기에도 함께 추가.
import Appclass2 from './component/Appclass2';
import Inputtest from './component/inputtest';
import If_test1 from './component/if_test1';
import For_test1 from './component/for_test1';
import Hero from './component/Hero';
import Gugudan from './component/gugudan';
import HeroList from './component/HeroList';
import HeroWrite from './component/HeroWrite';
// import 첫 대문자. from 파일명 그대로.

function App() {
  return (
    <div className="App">
      <h1 className='title'>제목제목</h1>
       {/* <Mycomponent1/> */}
       {/* <Appclass address="서울시 성동구 알파코캠퍼스" title="자기소개 중입니다."/>  */}
       {/* <Appclass2 address="서울시 영등포구 국민은행" title="나의 회사 소개 중입니다."/> */}
       {/* Appclass를 가지고 오면서 address와 title 추가로 출력가능. */}
       {/* <Inputtest/> */}
       {/* <If_test1/> */}
       {/* <For_test1/> */}
       {/* <Hero/> */}
       {/* <Gugudan/> */}
       <HeroList/>
       <HeroWrite/>
    </div>
  );
}

export default App;

// https://reactjs.org 리액트 관련 사이트