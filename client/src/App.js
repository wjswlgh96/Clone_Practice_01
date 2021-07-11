import React, { Component, useState } from 'react';
import Login from './components/Login'
import MyPage from './components/MyPage'

import './App.css';

function App() {

  const [isLogin, setLogin] = useState(false);

  return (
    <div className="App">
      {isLogin ?
        <MyPage /> :
        <Login />}
    </div>
  );
}

export default App;
