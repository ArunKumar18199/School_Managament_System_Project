import React, { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import image from './image.svg';

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (response.data.success) {
        // localStorage.setItem("token", response.data.token); // Store the token in localStorage
        nav("/Home"); // Redirect to welcome page or any authenticated page
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Invalid email or password");
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
                Don't have an account?{" "}
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
