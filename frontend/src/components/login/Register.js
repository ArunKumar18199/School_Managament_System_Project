import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import image from './image2.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const nav = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role
      });
      if (response.status === 201) {
        setMessage("User created successfully");
        toast.success("User Created successfully!");
        nav("/login"); // Redirect to the home page or any authenticated page
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error creating user");
    }
  };

  return (
    <div className="w3l-mockup-form">
      <div className="container">
        <div className="workinghny-form-grid">
          <div className="main-mockup">
            <div className="w3l_form align-self">
              <div className="left_grid_info">
                <img src={image} alt="Register" />
              </div>
            </div>
            <div className="content-wthree">
              <h2>Register Now</h2>
              {message && <div className="alert alert-danger">{message}</div>}
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  className="name"
                  name="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="confirm-password"
                  name="confirm-password"
                  placeholder="Enter Your Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
                <button name="submit" className="btn" type="submit">
                  Register
                </button>
              </form>
              <div className="social-icons">
                <p>
                  Have an account!{" "}
                  <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
