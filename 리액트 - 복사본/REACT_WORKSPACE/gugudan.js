// 구구단 출력하기
// rcc 자동완성.
import React, { useState } from 'react';

function Gugudan (props) {
    
    const [gugudanList, setGugudanList] = useState([0]);
    const [gugudanX, setGugudanX]= useState(0); //숫자. '단' 값
    const [gugudanY, setGugudanY]= useState(parseInt([1,2,3,4,5,6,7,8,9])); //숫자
    //const [result, setResult] = useState(parseInt(gugudanX) * parseInt(gugudanY));
    const [show, setShow] = useState(false); //true 일 땐 출력. f일 땐 미노출.
 
    
    // 함수 만들기 : 입력받은 '단'값으로 바뀌어 출력될 수 있도록
   const xChange=((e)=>{
      setShow(false); //미노출
      setGugudanX(e.target.value);
   }) 
   const yChange=((e)=>{
      setGugudanY(e.target.value);
   })
  

   // 버튼 누르면 (F -> T로 바뀌고), 구구단 계산 결과 보여주는 함수.
   const goAddend=( ()=>{
      setShow(true);
     
   })

    
   // 화면
   return(
    <div>
      <p>구구단 출력을 원하는 단을 숫자로 입력하세요</p>
      몇 단을? : <input type='text' onChange={xChange} value={gugudanX}/>
      어디까지? : <input type='text' onChange={yChange} value={gugudanY}/>
      <button type='button' onClick={ goAddend }>출력하기</button>
        <ul>
        {
         
        gugudanList.map ( (item, index)=>{
        return (
            <li key={index}>
              {gugudanX} X {gugudanY} = {parseInt(gugudanX) * parseInt(item) }
            </li>
            );
         })
         //:""
        }    
        </ul>
   </div> 
   )
}

export default Gugudan;