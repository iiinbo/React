// *함수 기반* 콤퍼넌트 해보기
import React, { useState } from 'react';


// 첫 대문자.
// 함수기반 콤퍼넌트 사용법 : 부모 -> 자식에게 값 보낼 때 '매개변수(props)' 이용.
function Fifth_homework () {
    
    // 이름
    const [name, setName] = React.useState(""); //문자는 ""
        // 이름 함수
        const nameChange=(e)=>{
            setName(e.target.value); // name 변수의 값이 set 함수에 담겨서 바뀐다.
        }      
    
   // 성적
    const [x, setX] = React.useState(0);   //국어 점수
          const [y, setY] = React.useState(0); // 영어 점수
          const [t, setT] = React.useState(0); //수학 점수
          const [sum, setSum] = React.useState(0);     
            
   
          // 성적 함수 만들기
         function xChange(e){
            setX(e.target.value);
         }
         function yChange(e){
            setY(e.target.value);
         }
         function tChange(e){
            setT(e.target.value);
         }

         //결과확인 버튼 누르면 이벤트 발생
         const add =()=>{
            setSum(parseInt(x) + parseInt(y) + parseInt(t));
         }
       
   return(
        <div>
        이름 : <input type="text" onChange={ nameChange } /> <br/>
        국어 : <input type="text" onChange={ xChange } /> <br/>
        영어 : <input type="text" onChange={ yChange }/> <br/>
        수학 : <input type="text" onChange={ tChange }/> <br/><br/>

        <button type="button" onClick={ add }>결과확인</button><br/>
           <p> {name} 님의 성적 총점은 {sum} (점) 이고, 평균은 {sum/3} (점) 입니다. </p>
           
        
        </div>
   )
   
}

export default Fifth_homework; // 첫 대문자. 컴포넌트 외부로 노출시켜야 사용 가능하므로.