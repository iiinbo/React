// rcc 자동완성

import React, { useState } from 'react';

function Hero (props) {
    
    const [heroList, setHeroList] = 
            useState([  { id: 1, name: "홍길동", descr: "아버지를아버지라부르지못하고" },
            { id: 2, name: "아인슈타인", descr: "척척박사" },
            { id: 3, name: "이순신", descr: "12척의 배가 있다." },
            { id: 4, name: "세종대왕", descr: "한글창제" }   ]);

    const [hero, setHero] = useState({name:"", descr:""});

    // 함수 만들기
    const nameChange=(e)=>{
        let h = hero; // 기존 값을 받아와서
        h.id = 999;
        h.name = e.target.value; // 새 값으로 바꾸고
        setHero(h); // 설정.
        //  setHero({name:e.target.value});
        //  console.log(hero); //test
        }       
    const descrChange=(e)=>{
        let h = hero; // 기존 값을 받아와서
        h.id = 999;
        h.descr = e.target.value; // 새 값으로 바꾸고
        setHero(h); // 설정.
        }   

    // 버튼 click 시 List에 인물추가해주는 함수만들기        
    const goAddend=()=>{
        setHeroList(heroList.concat(hero));
        console.log(hero); //test
        setHero({name:"", descr:""}); //초기화. 해줘야 각각 담김
        }


        //화면   
        return (
            <div>
                위인이름 : <input type='text'  onChange={nameChange}/><br/>
                위인업적 : <input type='text'  onChange={descrChange}/><br/>
                <button type='button' onClick={ goAddend }>인물추가하기</button><br/><br/>
                <table>
                    {
                        //  .map : List(배열) 에 담긴 정보 보기
                    heroList.map( (hero, index)=>{
                        return(
                            <tr key={index}>
                                <td>{hero.id}</td>
                                <td>{hero.name}</td>
                                <td>{hero.descr}</td>
                            </tr>
                              )
                    })
                    }
                </table>
            </div>
        )
    
}

export default Hero;