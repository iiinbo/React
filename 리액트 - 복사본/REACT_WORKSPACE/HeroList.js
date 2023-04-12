// rcc 자동완성
// 백엔드 서버로부터 데이터 가져오기
// axios - 설치 필요함

import { useEffect, useState } from "react";
import axios from "axios";

function HeroList(props){
    const [heroList, setHeroList] = useState([]);
    const [loading, setLoading] = useState(false); // data 수신하면 true로 바뀐다.
    // userState : 이 함수가 값을 초기화 해주면, 값을 저장/변경하는 함수를 반환해주는 역할.
    // 배열값 변환할 함수의 주소가 되는 것이 왼쪽.

    // 1- 매개변수 mount 될 때. update 될 때. unmount 될 때 호출!
    useEffect( ()=>{
    
        // **** axios : promise(비동기를 동기식으로) 기반의 컴포넌트 ****
        axios.get("http://localhost:9090/hero/list")
        .then( (res)=>{
            console.log("***********");
            console.log(res);
            setHeroList(res.data);
            setLoading(true); // 이 함수 만든 이유 : 아래 .map은, 데이터 가져오기도 전에 먼저 출력하려 들 때가있어서.
                            // true 일 때 출력되도록, 기본 디폴트를 false로 설정했었다.
        })
        .catch( (res, status, error )=>{
            console.log(status);
        })
         }, 
     []);

    return(
            <table>
                {
                loading === true? // true일 때~ 아래 .map 실행시키란 조건!
                // 간혹 데이터가 늦게 불러와지는데 map함수가 먼저 실행되는 경우 발생.
                    heroList.map( (item, index)=>{
                         return (
                        <tr>
                            {/* 테이블 칼럼명과 동일하게 쓰기 */}
                            <td>{item.id}</td>
                            <td>{item.heroname}</td>
                            <td>{item.herodescr}</td>
                        </tr>
                    )
                 })
                :""
                }
            </table>
    )

}

export  default HeroList;