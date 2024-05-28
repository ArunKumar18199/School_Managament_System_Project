import { useState, useEffect } from 'react';
import StudentEnrollment from "../Student/StudentEnrollment";
import TeacherEnrollment from '../teacher/TeacherEnrollment';
import GradeManagement from "../grades/GradeManagement";
import FeeManagement from "../fees/FeeManagement";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MainContent.css';
import Chat from '../chat/Chat';


const MainContent = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [user, setUser] = useState();
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    setUser(location.state.user);
  }, [location.state]);

  const handleStudentManagementClick = () => {
    setSelectedComponent(selectedComponent === 'StudentEnrollment' ? null : 'StudentEnrollment');
  };
  const handleTeacherManagementClick = () => {
    setSelectedComponent(selectedComponent === 'TeacherEnrollment' ? null : 'TeacherEnrollment');
  };

  const handleGradeManagementClick = () => {
    setSelectedComponent(selectedComponent === 'GradeManagement' ? null : 'GradeManagement');
  };

  const handleFeeManagementClick = () => {
    setSelectedComponent(selectedComponent === 'FeeManagement' ? null : 'FeeManagement');
  };

  const handleLogout = () => {
      toast.success("Logged Out successfully!");
      nav("/"); 
  };

  return (
    <div className="main-container">
     <div className="content-container">
        <div style={{ height: 'calc(100vh - 100px)', width: `calc(100% - $240px)`, overflowY: 'auto' }} className="your-element">
          <h1>School Management System</h1>
          <h3>Welcome {user && user.name}! ({user && user.role})</h3><br></br>
          {user && (user.role ==='admin' || user.role ==='teacher' || user.role ==='student') && 
              <button onClick={handleStudentManagementClick}>Student Management</button> }&nbsp;
          {user && (user.role ==='admin' || user.role ==='teacher') && 
          <button onClick={handleTeacherManagementClick}>Teacher Management</button> } &nbsp;
          {user && (user.role ==='admin' || user.role ==='teacher' || user.role ==='student') &&
          <button onClick={handleGradeManagementClick}>Grade Management</button> } &nbsp;
          {user && (user.role ==='admin' || user.role ==='student') &&
          <button onClick={handleFeeManagementClick}>Fee Management</button> }&nbsp;
          <button onClick={handleLogout}>Logout</button>
          {selectedComponent === 'StudentEnrollment' && <StudentEnrollment />}
          {selectedComponent === 'TeacherEnrollment' && <TeacherEnrollment />}
          {selectedComponent === 'GradeManagement' && <GradeManagement />}
          {selectedComponent === 'FeeManagement' && <FeeManagement />}
        </div>
      </div>
      <div className="messaging-container">
        <h2>Chat Here</h2>
        { user && <Chat user={user}/> }
      </div> 
    </div>
  );
};

export default MainContent;
