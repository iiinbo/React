// list

// 함수기반 컴포넌트 : useState, useEffect \ axios 필수
import 'bootstrap/dist/css/bootstrap.min.css' //부트스트랩 라이브러리
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { SERVERIP } from '../../CommonUtil'; //**추가 */
import { Link } from 'react-router-dom';

 function ScoreListFront(props){
    
        const [ScoreList, setScoreList] = useState([]);
        const [loading, setLoading] = useState(false);
        useEffect(()=>{
          async function loadData(){
            const url = SERVERIP + "/score/list";
            await axios.get(url)
            .then( (res)=>{
              setScoreList(res.data);
                setLoading(true);
                console.log(res.data);
            })
            .catch((error)=>{
                console.log(error);
            })
          }

          loadData(); // async function 함수 호출해주면, db 정보가 화면에 잘 출력된다.
        },  []);
        return(
        <div className="container">
            <h1>학생 성적안내 게시판</h1>
            <div className="input-group mb-3" style={{marginTop:"20px"}}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                선택하세요
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">제목</a></li>
              <li><a className="dropdown-item" href="#">내용</a></li>
              <li><a className="dropdown-item" href="#">제목+내용</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>
        <table className="table table-hover ">
            <thead className="table-secondary">
              <tr>
                <th>번호</th>
                <th>학생명</th>
                <th>국어점수</th>
                <th>영어점수</th>
                <th>수학점수</th>
              </tr>
            </thead>
            <tbody>
                {
                loading === true?
                ScoreList.map( (item, index)=>{
                    return(
                      <tr key={index}>
                          <td>{item.id}</td>
                          <td><Link to={'/score/view/'+item.id}>{item.st_name}</Link></td>
                          <td>{item.kor}</td>
                          <td>{item.eng}</td>
                          <td>{item.mth}</td>
                      </tr>
                    )
                })
                :""
                // return 값 있으면 안에내용 출력 . 아니면 "" 공백의미.
                }

            </tbody>
          </table>
          
          <div>
              <Link className='btn btn-danger' to='/score/write'>추가등록</Link>
        </div>
       </div>
    )
}
export default ScoreListFront;