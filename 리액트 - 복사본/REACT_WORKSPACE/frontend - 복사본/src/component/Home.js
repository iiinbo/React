import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>왜들 그리 down되어있어? 코딩 뭐가 문제야, say somthing! </h1><br/><br/>
                <img src="./브레드.png" className="img" style={{width:"50%"}}></img><br/><br/>
                <h5>이 페이지는, DIGI Campus 정인보가 돈벌기 위해 가리지 않고 프론트와 백엔드 개발에 열중하고자 연습하는 화면입니다.</h5>
            </div>
        );
    }
}

export default Home;