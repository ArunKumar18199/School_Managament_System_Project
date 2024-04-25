// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Import jwt_decode to decode the JWT token

// function MainContent() {
//     const nav = useNavigate();
//     const [role, setRole] = useState(null);

//     useEffect(() => {
//         // Retrieve token from localStorage
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Decode the token to get user information
//             const decodedToken = jwtDecode(token);
//             setRole(decodedToken.role); // Set the user's role
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Remove token from localStorage
//         nav("/"); // Redirect to login page
//     };

//     return (
//         <div>
//             <h1>School Management System</h1>
//             {role && <h3>Welcome {role}!</h3>} {/* Display welcome message with role */}
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// }

// export default MainContent;


import { useState } from 'react';
import StudentEnrollment from "../Student/StudentEnrollment";
import GradeManagement from "../grades/GradeManagement";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const nav = useNavigate();

  // ...

  const handleStudentManagementClick = () => {
    setSelectedComponent(selectedComponent === 'StudentEnrollment' ? null : 'StudentEnrollment');
  };

  const handleGradeManagementClick = () => {
    setSelectedComponent(selectedComponent === 'GradeManagement' ? null : 'GradeManagement');
  };

  const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      nav("/"); // Redirect to login page
  };

  return (
    <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <h1>School Management System</h1>
      <button onClick={handleStudentManagementClick}>Student Management</button>
      <button onClick={handleGradeManagementClick}>Grade Management</button>
      <button onClick={handleLogout}>Logout</button>
      {selectedComponent === 'StudentEnrollment' && <StudentEnrollment />}
      {selectedComponent === 'GradeManagement' && <GradeManagement />}
    </div>
  );
};

export default MainContent;
