import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 라이브러리
import {Outlet, Link, NavLink} from 'react-router-dom'; // return에 사용할 것 추가

function Layout (props) {

        return (
            <div>
                {/* 부트스트랩 사이트 : navbar 참조 주의. Name => classNameName으로 바꾸고 사용 */}
                {/* React : <a> href = 사용안함 => <navLink> to = 로 대체.  */}
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/">메인</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/board/list">영웅게시판</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/score/list">성적게시판</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="#">기타</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link disabled" to="#">Disabled</NavLink>
                        </li>
                        </ul>
                    </div>
                </nav>
                <br/> <br/>
                <Outlet/>
                {/* Outlet : 출력되는 위치. 안써주면 출력안됨 */}
            </div>
        );
    }


export default Layout;