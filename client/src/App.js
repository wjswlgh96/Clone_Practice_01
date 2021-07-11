import React, { Component, useState } from 'react';
import Login from './components/Login'
import MyPage from './components/MyPage'
import SignUp from './components/SignUp'

import './App.css';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';

function App() {

  const [isLogin, setLogin] = useState(false);


  function ChangeLogin() {
    setLogin(true);
  }

  return (
    <BrowserRouter>
      <HashRouter>
        <div className="App">
          {isLogin ?
            <Route path="/MyPage" component={MyPage}></Route> :
            <Route path="/" exact={true} component={Login}></Route>
          }
        </div>
        <Route path="/SignUp" ChangeLogin={ChangeLogin} component={SignUp}></Route>
      </HashRouter>
    </BrowserRouter>
  );
}

export default App;
