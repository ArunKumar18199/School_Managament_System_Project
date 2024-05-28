import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/login/Home";
import './App.css';
import UserContext from "./components/context/UserContext";
import Navbar from "./components/navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import React, { useState, useCallback } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [usertoken, setUsertoken] = useState(null);
  const nav = useNavigate();

  const login = useCallback((userData) => {
    setUser(userData.user);
    setUsertoken(userData.token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setUsertoken(null);
    nav('/');
  }, [nav]);


  return (
    <div className="App">
      <UserContext.Provider value={{ user, login, logout, usertoken, setUsertoken }}>
        <Routes>
          <Route path='/' element={<Navbar />}/>
          <Route exact path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
