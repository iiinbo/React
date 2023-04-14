import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
//
import Layout from './component/Layout'; // ** 라우터 추가
import Home from './component/Home'; // ** 라우터 추가
import BoardList from './component/board/BoardList'; // ** 라우터 추가
import BoardWrite from './component/board/BoardWrite'; // ** 라우터 추가
import BoardView from './component/board/BoardView'; // ** 라우터 추가
import ScoreListFront from './component/score/ScoreListFront'; // ** 실습과제 추가
import HeroList from './component/hero/HeroList'; // ** 실습과제 추가
import HeroWrite from './component/hero/HeroWrite'; // ** 실습과제 추가
//
function App() {
  return (
    <div className="App">
        <Routes>
              <Route path='/' element={ <Layout/> } >
              <Route index element={ <Home/> } />
              <Route path='/board/List' element={ <BoardList/> } />
              <Route path='/board/write' element={ <BoardWrite/> } />
              <Route path='/board/view/:id' element={ <BoardWrite/> } />
              <Route path='/score/list' element={ <ScoreListFront/> } />
              <Route path='/hero/list' element={ <HeroList/> } />
              <Route path='/hero/write' element={ <HeroWrite/> } />
              
              </Route>
        </Routes>
    </div>
  );
}

export default App;
