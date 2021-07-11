import React, { useState } from 'react';
import axios from "axios";

// 현재 들어와야 하는 props 는 유저의 데이터
// 내 정보 페이지
function MyPage({ accessToken, LogOut, refreshAccessToken }) {

    const [userInfo, setUserInfo] = useState({});

    function isEmpty(param) {
        return Object.keys(param).length === 0;
    }

    function ClickLogOut() {
        alert("로그아웃 되었습니다!");

        LogOut();
    }

    const accessTokenRequest = async () => {
        if (!accessToken) {
            alert("액세스 토큰 요청 실패, 리프레쉬 토큰으로 재발급 받으세요!");
        } else {
            alert("액세스 토큰 요청 성공!");

            let userInfo = await axios("https://localhost:4000/accesstokenrequest", {
                method: "get",
                headers: { "authorization": `Bearer ${accessToken}` }
            });

            const { userId, email, phone } = userInfo.data.userInfo;

            setUserInfo({
                userId: userId,
                email: email,
                phone: phone,
            });
        }
    }

    const refreshTokenRequest = async () => {
        let userInfo = await axios.get("https://localhost:4000/refreshtokenrequest", {
            withCredentials: true,
        });

        if (userInfo) {
            const { userId, email, phone } = userInfo.data.userInfo;

            setUserInfo({
                userId: userId,
                email: email,
                phone: phone,
            });

            refreshAccessToken(userInfo.data.accessToken);

            alert("리프레쉬 토큰 재발급 성공!");
        } else {
            alert("리프레쉬 토큰에 대한 정보가 존재하지 않습니다");
        }
    }

    return (
        <div className="mypage_container">
            <div className="mypage_title">My Page</div>
            <div className="mypage_userId">사용자의 아이디: {
                isEmpty(userInfo) ? "액세스 토큰 요청이 필요합니다" : userInfo.userId
            } </div>
            <div className="mypage_userEmail">사용자의 이메일: {
                isEmpty(userInfo) ? "액세스 토큰 요청이 필요합니다" : userInfo.email
            } </div>
            <div className="mypage_userPhone">사용자의 휴대폰 번호: {
                isEmpty(userInfo) ? "액세스 토큰 요청이 필요합니다" : userInfo.phone
            } </div>
            <div className="mypage_button_container">
                <button className="mypage_access_button" onClick={accessTokenRequest}>
                    엑세스 토큰 요청
                </button>
                <button className="mypage_refresh_button" onClick={refreshTokenRequest}>
                    리프레쉬 토큰 요청
                </button>
                <button onClick={ClickLogOut} className="mypage_logout_button">
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default MyPage;