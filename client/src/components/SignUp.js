import React, { Component } from "react";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from "axios";

// 회원가입 페이지
// DB 의 상태를 바꿔줘야함
function SignUp() {

    function ClickSignIn() {

        const userId = document.getElementById("signup_input_name").value;
        const password = document.getElementById("signup_input_password").value;
        const email = document.getElementById("signup_input_email").value;
        const phone = document.getElementById("signup_input_phone").value;

        const userInfo = {
            userId: userId,
            password: password,
            email: email,
            phone: phone
        };

        console.log("user의 정보:", userInfo);

        // 새로 만든 유저의 정보
        axios("https://localhost:4000/signup", {
            method: "post",
            data: userInfo
        })
            .then(res => {
                if (res.data === 'Fail') {
                    alert("이미 존재하는 회원정보입니다!");
                } else {
                    alert("회원 가입 성공!");
                }
            });
    }

    return (
        <div className="signup_container">
            <div className="signup_title">Sign Up</div>
            <div>모든 항목은 필수입니다.</div>
            <span className="signup_name">이름
                <input id="signup_input_name" type="text" />
            </span><br />
            <span className="signup_password">비밀번호
                <input id="signup_input_password" type="text" />
            </span><br />
            <span className="signup_email">이메일
                <input id="signup_input_email" type="text" />
            </span><br />
            <span className="signup_phone">전화번호
                <input id="signup_input_phone" type="text" />
            </span><br />
            <Link to="/" className="signup_link">이미 아이디가 있으신가요?</Link><br />
            <button onClick={ClickSignIn} className="signup_button">회원가입</button>
        </div >
    );
}

export default SignUp;