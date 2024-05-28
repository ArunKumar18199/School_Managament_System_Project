import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import image from './image.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      if (response.data.success) {
        await axios.get('http://localhost:5000/api/auth/api/example',{headers:{'Authorization':'Bearer '+response.data.token}})
        .then(res=> {
          if(res.status === 200){
            setMessage('Login successful');
            toast.success("Logged in successfully!");
            nav('/Home', {state: {user:response.data.role}}); 

          }
        })
      } 
    } catch (error) {
      setMessage(error.message && "Invalid email or password");
    }
  };

  return (
    <div className="w3l-mockup-form">
      <div className="container">
        <div className="workinghny-form-grid">
          <div className="main-mockup">
            <div className="w3l_form align-self">
              <div className="left_grid_info">
                <img src={image} alt="login" />
              </div>
            </div>
            <div className="content-wthree">
              <h2>Login Now</h2>
              {message && <div className="alert alert-danger">{message}</div>}
              <form onSubmit={submitHandler}>
                <input
                  type="email"
                  className="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login">
                  Login
                </button>
              </form>
              <p>
                Don't have account?{" "}
                <NavLink to="/register">Register</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
