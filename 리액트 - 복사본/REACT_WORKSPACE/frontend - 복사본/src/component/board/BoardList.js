// 함수기반 컴포넌트 : useState, useEffect \ axios 필수
import 'bootstrap/dist/css/bootstrap.min.css' //부트스트랩 라이브러리
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { SERVERIP } from '../../CommonUtil'; //**추가 */
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination'; //** 페이지 추가 */
import "../../page.css"; //** css추가. (파일위치 : src 폴더) */

 function BoardList(props){
    
        const [boardList, setBoardList] = useState([]);
        const [loading, setLoading] = useState(false); // 로딩완료 후 조건주기 위해서.
        const [totalCnt, setTotalCnt] = useState(0); // 페이지추가 위해서.
        const [pg, setPg] = useState(0); // 페이지추가 위해서.
        
        const loadData = async  (pg)=>{
          const url = SERVERIP + "/rest_board/list/"+pg; //여기만 백엔드 서버 경로와 동일
          await axios.get(url)
          .then( (res)=>{
            console.log("****************************")
            let totalCnt = res.data.totalCnt;
            let pg = res.data.pg;
            let boardList = res.data.boardList;
            console.log("데이터 전체개수 : ", totalCnt);
            console.log("현재 페이지 : ", pg);
            console.log("데이터 : ", boardList);

            setTotalCnt(totalCnt);
            setPg(pg);
            setBoardList(boardList);
            setLoading(true);
             
          })
          .catch((error)=>{
              console.log(error);
          })
        }
        
         //함수
        const goPage=(pg)=>{
            loadData(pg); 
          }

        useEffect(()=>{
          loadData(1); // async function 함수 호출해주면, db 정보가 화면에 잘 출력된다.
        },  []);

       

        return(
        <div className="container">
            <h1>게시판</h1>
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
            <colgroup>
              <col width="10%"/>
              <col width="*"/>
              <col width="20%"/>
              <col width="10%"/>
              <col width="20%"/>
            </colgroup>
            <thead className="table-secondary">
              <tr>
                <th>글번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
                {
                loading === true && boardList!=undefined?
                  boardList.map( (item, index)=>{
                      return(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td><Link to={'/board/view/'+item.id}>{item.title}</Link></td>
                            <td>{item.writer}</td>
                            <td>{item.hit}</td>
                            <td>{item.wdate}</td>
                        </tr>
                      )
                  })
                :""
                // return 값 있으면 안에내용 출력 . 아니면 "" 공백의미.
                }

            </tbody>
          </table>
             {/* activePage : 현재 페이지, itemsCountPerPage : 한페이지 행 개수  */}
        <Pagination
            activePage={pg} 
            itemsCountPerPage={10}
            totalItemsCount={totalCnt}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={goPage}
        />
          <div>
              <Link className='btn btn-danger' to='/board/write'>글쓰기</Link>
        </div> 
        {/* return 안에는, 백엔드와 관련없음. to='경로'는 프론트 파일명이나 경로를 쓸 것. */}
       </div>
    )
}
export default BoardList;