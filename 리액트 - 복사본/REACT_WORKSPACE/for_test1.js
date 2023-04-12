// 과일 추가하기
// rcc 자동완성.
import React, { useState } from 'react';

function For_test1 (props) {
    
    const [fruitList, setFruitList] = useState(["딸기","배","사과","반나나","포도"]);
    const [fruit, setFruit]= useState(""); //문자
 
    
    // 함수 만들기 : 입력받은 fruit의 값으로 바뀔 수 있도록
   const onChange=((e)=>{
      setFruit(e.target.value);
   })

   // 입력받은 fruit을 List에 담아주는 함수
   const goAddend=( ()=>{
      setFruitList( fruitList.concat(fruit) );
      setFruit(""); // new배열에 담길 fruit 값은 사용자에게 받을거라, 초기화.

      // tip. 배열에 push 함수는 사용 x, 원래 배열에 data 추가방식 가능
      // 배열 자체를 새로 만들어서 바꿔치기한다.(새로운 배열명 setFruitList)
      // concat : new 배열만들기. 기존 배열 내용에다가 더하기.
   })

    //이벤트 함수 만들기
   const goSelect=(index)=>{
      alert(fruitList[index]); // click 시 alert 뜨는데, 내용은 index명 그대로.
   }
   return(
    <div>
      <input type='text' onChange={onChange} value={fruit}/>
      <button type='button' onClick={goAddend}>fruit추가하기</button>
        <ul>
        {
        fruitList.map ( (item, index)=>{
        return (
            <li key={index}>
               <a href='#none' onClick={()=>{goSelect(index)}}>{item}</a>
            </li>
            );
         })
        }    
        </ul>
   </div> 
   )
}

export default For_test1;