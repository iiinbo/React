// tip. rcc 라고 입력하면 자동완성.

import React, { useState } from 'react';

function If_test1 (props) {
    
    // if문 대신 사용하는 문법 : flag가 true이면, 버튼 click => 문구 보이기.
    const [flag, setFlag] = useState(true);
    
    // 버튼 click 시 이벤트 효과 함수 만들기.
    const changeFlag = ()=>{
        setFlag ( !flag ); // 이벤트 효과 발생하면, true를 -> flase로 바뀌게 한다.
    }
    

        return (
            <div>
                <h1>if문 테스트하기{flag}</h1>
                <button type='button' onClick={changeFlag}>토글</button>
                <p>{flag ? '이 문구가 보입니다.':''}</p>
            </div>
        );
    
}

export default If_test1;