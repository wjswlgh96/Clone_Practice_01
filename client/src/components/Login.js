import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// Login 버튼을 누르면 이벤트 실행해야함
// 먼저 axios 를 통해서 유저의 정보가 일치하는지 확인후에 일치하면 State 변경

function Login(ChangeLogin) {

  function loginButton() {
    axios("https://localhost:4000/login", {
      method: "post",

    });
  }

  return (
    <div className="login_container">
      <div className="login_title">Sign In</div>
      <span className="login_email">
        이메일  <input className="login_email_input" />
      </span><br />
      <span className="login_password">
        비밀번호  <input className="login_password_input" />
      </span><br />
      <Link to="/SignUp" className="login_link">아직 아이디가 없으신가요?</Link><br />
      <button onClick={loginButton} className="login_button">로그인</button>
    </div>
  );
}

export default Login;