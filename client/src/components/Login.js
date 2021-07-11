import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// Login 버튼을 누르면 이벤트 실행해야함
// 먼저 axios 를 통해서 유저의 정보가 일치하는지 확인후에 일치하면 State 변경

function Login({ SuccessLogin }) {

  const loginButton = async () => {

    const userId = document.getElementById("login_id_input").value;
    const password = document.getElementById("login_password_input").value;

    const login = await axios("https://localhost:4000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" }, withCredentials: true,
      data: {
        userId: userId,
        password: password
      },
    });

    if (login.data === "로그인에 실패하였습니다.") {
      alert("존재하지 않는 회원정보입니다!");
    } else {
      SuccessLogin(login.data.accessToken);
      alert("로그인 되었습니다!");
    }
  }

  return (
    <div className="login_container">
      <div className="login_title">Sign In</div>
      <span className="login_email">
        아이디  <input id="login_id_input" type="text" />
      </span><br />
      <span className="login_password">
        비밀번호  <input id="login_password_input" type="password" />
      </span><br />
      <Link to="/SignUp" className="login_link">아직 아이디가 없으신가요?</Link><br />
      <button onClick={loginButton} className="login_button">로그인</button>
    </div>
  );
}

export default Login;