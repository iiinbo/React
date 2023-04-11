// *함수 기반* 콤퍼넌트 해보기
import React, { useState } from 'react';


// 첫 대문자.
// 함수기반 콤퍼넌트 사용법 : 부모 -> 자식에게 값 보낼 때 '매개변수(props)' 이용.
function Fifth_clone_cording () {
          const [x, setX] = React.useState(0);   
          const [y, setY] = React.useState(0);
          const [z, setZ] = React.useState(0);        
   
          // 함수 만들기
         function xChange(e){
            setX(e.target.value);
         }
         function yChange(e){
            setY(e.target.value);
         }

         //버튼 이벤트
         const add =()=>{
            setZ(parseInt(x) + parseInt(y));
         }
         const sub =()=>{
            setZ(parseInt(x) - parseInt(y));
         }
         
   return(
        <div>
           X : <input type="text" onChange={ xChange } placeholder='정수를 입력하세요'/> <br/>
           Y : <input type="text" onChange={ yChange } placeholder='정수를 입력하세요'/> <br/>
           <h1>{z}</h1>
           <button type="button" onClick={ add }>덧셈결과(+)</button>
           <button type="button" onClick={ sub }>뺄셈결과(-)</button>
        </div>
   )
   
}

export default Fifth_clone_cording; // 첫 대문자. 컴포넌트 외부로 노출시켜야 사용 가능하므로.