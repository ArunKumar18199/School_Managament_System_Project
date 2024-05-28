import React from "react";
import {NavLink} from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return (
         <div>
         <header className="header">
           <div className="container">
             <h1>AK Schools</h1>
             <nav>
               <ul className="nav-links">
                 <li><NavLink to="/login" className="btn" id="login-btn">Login</NavLink></li>
                 <li><NavLink to="/register" className="btn" id="signup-btn">Register</NavLink></li>
               </ul>
             </nav>
           </div>
         </header>
   
         <main className="main-content">
           <div className="intro">
             <h2>Welcome to the AK School Management System</h2>
             <p>Efficiently manage school activities, student records, and more with our comprehensive system.</p>
           </div>
         </main>
       </div>
    )
};

export default Navbar;