import './TeacherEnrollment.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const TeacherEnrollment = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', employeeId: '', classNos: [], subjects: [], address: '', contactDetails: '', salaryAmount: '' });
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [classNoInput, setClassNoInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
        setUser(location.state.user);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };  
    getTeachers();
  }, [location.state]);

  const getTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data);
      setUser(location.state.user);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const createTeacher = async () => {
    try {
      await axios.post('http://localhost:5000/api/teachers', newTeacher);
      setNewTeacher({ name: '', employeeId: '', classNos: [], subjects: [], address: '', contactDetails: '', salaryAmount: '' });
      getTeachers();
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      getTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const updateTeacher = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/teachers/${selectedTeacher._id}`, newTeacher);
      setSelectedTeacher(null);
      setNewTeacher({ name: '', email: '', employeeId: '', classNos: [], subjects: [], address: '', contactDetails: '', salaryAmount: '' });
      getTeachers();
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const selectTeacherForEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setNewTeacher({ name: teacher.name, email: teacher.email, employeeId: teacher.employeeId, classNos: teacher.classNos, subjects: teacher.subjects, address: teacher.address, contactDetails: teacher.contactDetails, salaryAmount: teacher.salaryAmount });
  };

  const handleClassNoInputChange = (e) => {
    setClassNoInput(e.target.value);
  };

  const handleSubjectInputChange = (e) => {
    setSubjectInput(e.target.value);
  };

  const handleEmailInputChange = (e) => {
    setNewTeacher({ ...newTeacher, email: e.target.value });
  };

  const addClassNo = () => {
    if (classNoInput.trim() !== '') {
      setNewTeacher({
        ...newTeacher,
        classNos: [...newTeacher.classNos, classNoInput]
      });
      setClassNoInput('');
    }
  };
  
  const addSubject = () => {
    if (subjectInput.trim() !== '') {
      setNewTeacher({
        ...newTeacher,
        subjects: [...newTeacher.subjects, subjectInput]
      });
      setSubjectInput('');
    }
  };  

  const removeClassNo = (index) => {
    setNewTeacher({ ...newTeacher, classNos: newTeacher.classNos.filter((_, i) => i !== index) });
  };

  const removeSubject = (index) => {
    setNewTeacher({ ...newTeacher, subjects: newTeacher.subjects.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h2 style={{ color: 'blue' }}>Teacher Enrollment Management</h2><br/>
      <div>
        <h3 style={{ color: 'blue' }}>Add Teacher</h3>
        <input
          type="text"
          placeholder="Name"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
        /> <br/>
        <input
          type="email"
          placeholder="Email"
          value={newTeacher.email}
          onChange={handleEmailInputChange}
        /> <br/>
        <input
          type="text"
          placeholder="Employee ID"
          value={newTeacher.employeeId}
          onChange={(e) => setNewTeacher({ ...newTeacher, employeeId: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Teaching Classes"
          value={classNoInput}
          onChange={handleClassNoInputChange}
        />
        <button onClick={addClassNo}>Add Class</button>
        <ul>
          {newTeacher.classNos.map((classNo, index) => (
            <li key={index}>
              {classNo} <button onClick={() => removeClassNo(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Teaching Subjects"
          value={subjectInput}
          onChange={handleSubjectInputChange}
        />
        <button onClick={addSubject}>Add Subject</button>
        <ul>
          {newTeacher.subjects.map((subject, index) => (
            <li key={index}>
              {subject} <button onClick={() => removeSubject(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Address"
          value={newTeacher.address}
          onChange={(e) => setNewTeacher({ ...newTeacher, address: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Contact Details"
          value={newTeacher.contactDetails}
          onChange={(e) => setNewTeacher({ ...newTeacher, contactDetails: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Salary Amount"
          value={newTeacher.salaryAmount}
          onChange={(e) => setNewTeacher({ ...newTeacher, salaryAmount: e.target.value })}
          required
        /> <br/>
        <button onClick={selectedTeacher ? updateTeacher : createTeacher}>
          {selectedTeacher ? 'Update' : 'Add'}
        </button>
        {selectedTeacher && (
          <button onClick={() => { setSelectedTeacher(null); setNewTeacher({ name: '', employeeId: '', classNos: [], subjects: [], address: '', contactDetails: '', salaryAmount: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <br/>
      <div className='teacherList'>
        <h3 style={{ color: 'blue' }}>Teachers List</h3>
        <ul>
          {teachers.map((teacher) => (
            <div key={teacher._id} className='teacherCard'>
              <li>
                Name: {teacher.name} <br/>
                Employee ID: {teacher.employeeId} <br/>
                Teaching Classes: {teacher.classNos.join(', ')} <br/>
                Teaching Subjects: {teacher.subjects.join(', ')} <br/>
                Address: {teacher.address} <br/>
                Contact Details: {teacher.contactDetails} <br/>
                {user && ( user.role ==='admin') && (
                  <div>
                Salary Amount: Rs. {teacher.salaryAmount} <br/>
                   <button onClick={() => selectTeacherForEdit(teacher)}>Edit</button>
                   <button onClick={() => deleteTeacher(teacher._id)}>Delete</button>
                 </div>
                )}
              </li>
            </div>
          ))}
        </ul>
        <br></br>
      </div>
      <br></br>
    </div>
  );
};

export default TeacherEnrollment;
