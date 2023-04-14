// 함수기반 컴포넌트 : useState, useEffect \ axios 필수
import 'bootstrap/dist/css/bootstrap.min.css' //부트스트랩 라이브러리
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { SERVERIP } from '../../CommonUtil'; //**추가 */
import { Link } from 'react-router-dom';

 function HeroList(props){
    
        const [HeroList, setHeroList] = useState([]);
        const [loading, setLoading] = useState(false);
        useEffect(()=>{
          async function loadData(){
            const url = SERVERIP + "/hero/list";
            await axios.get(url)
            .then( (res)=>{
                setHeroList(res.data);
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
            <h1>글로벌 영웅 게시판</h1>
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
                <th>글번호</th>
                <th>위인이름</th>
                <th>업적</th>
              </tr>
            </thead>
            <tbody>
                {
                loading === true?
                HeroList.map( (item, index)=>{
                    return(
                      <tr key={index}>
                          <td>{item.id}</td>
                          <td><Link to={'/hero/view/'+item.id}>{item.heroname}</Link></td>
                          <td>{item.herodescr}</td>
                      </tr>
                    )
                })
                :""
                // return 값 있으면 안에내용 출력 . 아니면 "" 공백의미.
                }

            </tbody>
          </table>
          
          <div>
              <Link className='btn btn-danger' to='/hero/write'>글쓰기</Link>
        </div>
       </div>
    )
}
export default HeroList;