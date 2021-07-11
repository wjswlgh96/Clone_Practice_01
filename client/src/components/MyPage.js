import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// 현재 들어와야 하는 props 는 유저의 데이터
// 내 정보 페이지
function MyPage() {
    return (
        <div className="mypage_container">
            <div className="mypage_title">My Page</div>
            <div className="mypage_userId">사용자의 아이디</div>
            <div className="mypage_userEmail">사용자의 이메일</div>
            <div className="mypage_userPhone">사용자의 번호</div>
            <button className="mypage_logout_button">로그아웃</button>
        </div>
    );
}

export default MyPage;