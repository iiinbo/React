// rcc 자동완성
// 백엔드 서버로부터 데이터 가져오기
// axios - 설치 필요함

import React, { useState } from "react";
import axios from "axios";

function HeroWrite(props){
    const [heroname, setHeroName] = useState("");
    const [herodescr, setHeroDescr] = useState("");

    // 이름 입력받으면 저장하는 {함수}
    const heroNameChange = (e)=>{
        setHeroName(e.target.value);
    }
    // 업적 입력받으면 저장하는 {함수}
    const heroDescrChange = (e)=>{
        setHeroDescr(e.target.value);
    }
    //
    const onSubmit= (e)=>{
        e.preventDefault(); //form 태그로 서버에 정보 전송하기 전 호출된다.
                            //버튼기능 정지시키는 역할. submit 버튼의 기능막고 별도 처리.

        axios.post("http://localhost:9090/hero/write", //axios : json으로 정보받기 필수.(스프링에선 json오류. 문자열로 가능)
        {heroname : heroname, herodescr : herodescr}) // 이방식을 json형태라고 한다.
        .then( (res)=>{
            console.log(res.data.result);
            window.location.reload(); // 화면 불러오기 기능
            // *단!! location객체 : 부모가 window 
            // React에서만 window 를 꼭 써줘야 호출된다.**
            //data : 리액트는 db에서 정보가져올 때 data라는 껍데기에 담아온다. 외우기그냥.
            })
        .catch( (error)=>{
            console.log(error);
            })

    }

    return(
        <div>
            <form onSubmit={onSubmit} >
                {/* form 태그 써서 서버로 정보 전송 시.
                button 태그 안에 type=button 없으면 버튼은 submit() 함수로 호출
                submit() 함수는 onSubmit 이벤트 핸들러로 호출되며 무조건 전송(오류도)
                오류전달을 막기위해서 preventDefault(); 함수를 추가 호출해줌. */}
                <h3>영웅</h3>
                이름 : <input type="text" onChange={heroNameChange}/> <br/>
                업적 : <input type="text" onChange={heroDescrChange}/> <br/>
                <button>추가하기</button>
           </form>
        </div>
    )

}

export  default HeroWrite;