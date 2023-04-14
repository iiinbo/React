// 함수기반 컴포넌트 : useState, useEffect \ axios 필수
import 'bootstrap/dist/css/bootstrap.min.css' //부트스트랩 라이브러리
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { SERVERIP } from '../../CommonUtil'; //**추가 */
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

function BoardWrite(props){
    let {id} = useParams(); // 보내는 쪽에서 json 객체로 보냈기 때문에.
    let history = useNavigate(); //이전 페이지로 바로가기

    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [writer, setWriter] = useState("");

    /// window.onlad 와 같은 역할 = useEffect
        // BoardWrite 컴포넌트가 /board/write 일 때 => undefined로 오고
        // /board/view/1 일 때 => id에는 파라미터 값이 저장된다.
    useEffect( ()=>{
        console.log("id ", id);
        async function loadData(id){ //id를 load한다.
            let results = await axios.get(SERVERIP+'/rest_board/view/'+id)
            console.log(results.data.board.title);
            console.log(results.data.board.contents);

            setTitle(results.data.board.title); // 사용자가 입력하면 가져올 수 있게.
            setContents(results.data.board.contents);
            setWriter(results.data.board.writer);
        }
        if(id != undefined) //write 가 아니고,view를 호출할 때. id있어야
                loadData(id); //가져오게

        
    }, []);
    //함수
    const titleChange=(e)=>{
        setTitle(e.target.value);
    }

    const contentsChange=(e)=>{
        setContents(e.target.value);
    }

    const writerChange=(e)=>{
        setWriter(e.target.value);
    }

    //확인버튼 클릭  > 서버로 데이터 전송하는 함수
    const postData=()=>{
        //사용자에게 입력받은 데이터는 json으로 DB(서버)한테 보낸다.
        let data = {"title":title, "contents":contents, "writer":writer};
        //json방식. "db칼럼명과 소대문자 똑같이" : const 상단에서 선언한것과 똑같이!
        
        axios.post(SERVERIP+"/rest_board/write", data)
        .then((res)=>{
            console.log(res.data);
            alert("게시글 등록이 완료되었습니다.");
            history("/board/list"); // 페이지 다시이전페이지로 이동 : redirect에 대응하는 함수만들기.
          
        })
        .catch((error)=>{
            console.log(error);
        })
       }

    return(
        <div className='container'>
            <h1>글쓰기</h1>
            <table className="table table-hover " style={{marginTop: "30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
        
            <tbody>
              <tr>
                <td>제목</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                        <input type="text" className="form-control" id="title" name="title" 
                        value={title}
                        placeholder="게시판 제목을 입력하세요" onChange={titleChange}/>
                    </div>
                </td>
              </tr>       
              <tr>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                    <input type="text" className="form-control" id="contents" name="contents" 
                        value={contents}
                        placeholder="게시판 내용을 자유롭게 입력하세요" onChange={contentsChange}/>
                    </div>
                </td>
            </tr> 
            <tr>
                <td>작성자</td>
                <td>
                    <div className="mb-3" style={{marginTop: "13px"}}>
                    <input type="text" className="form-control" id="writer" name="writer" 
                        value={writer} placeholder="userid를 입력하세요" onChange={writerChange} />
                    </div>
                </td>
            </tr>          
            </tbody>
          </table>
       

          <div className="container mt-3" style={{textAlign: "right"}}>
            <Link className="btn btn-secondary" onClick={postData}>등록</Link> &nbsp; &nbsp;
            <Link className="btn btn-secondary">취소</Link>
          </div>
        </div>

    )
}

export default BoardWrite;