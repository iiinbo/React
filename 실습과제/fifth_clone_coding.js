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
           X : <input type="text" onChange={ xChange }/> <br/>
           Y : <input type="text" onChange={ yChange }/> <br/>
           <h1>{z}</h1>
           <button type="button" onClick={ add }>더하기(+)</button>
           <button type="button" onClick={ sub }>빼기(-)</button>
        </div>
   )
   
}

export default Fifth_clone_cording; // 첫 대문자. 컴포넌트 외부로 노출시켜야 사용 가능하므로.