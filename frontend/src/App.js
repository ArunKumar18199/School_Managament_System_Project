import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/login/Home";
import './App.css';


function App() {
  return (
    <div className="App">
    <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
    </Routes>
    </div>
  );
}

export default App;
