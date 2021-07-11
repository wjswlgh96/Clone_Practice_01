import React, { useState } from 'react';
import Login from './components/Login'
import MyPage from './components/MyPage'
import SignUp from './components/SignUp'

import './App.css';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';

function App() {

  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  function SuccessLogin(data) {
    setLogin(true);
    setAccessToken(data);
  }

  function LogOut() {
    setLogin(false);
  }

  function refreshAccessToken(data) {
    setAccessToken(data);
  }

  return (
    <BrowserRouter>
      <HashRouter>
        <div className="App">
          {isLogin ?
            <MyPage accessToken={accessToken} LogOut={LogOut} refreshAccessToken={refreshAccessToken} /> :
            <Route path="/" exact={true} render={() => <Login SuccessLogin={SuccessLogin} />}></Route>
          }
        </div>
        <Route path="/SignUp" component={SignUp}></Route>
      </HashRouter>
    </BrowserRouter >
  );
}

export default App;
