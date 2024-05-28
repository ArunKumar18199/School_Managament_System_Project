import './StudentEnrollment.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const StudentEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', rollNumber: '', classNo: '', address: '', contactDetails: '', feeAmount: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
        setUser(location.state.user);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    getStudents();
  }, [location.state]);

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setUser(location.state.user);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createStudent = async () => {
    try {
      await axios.post('http://localhost:5000/api/students', newStudent);
      setNewStudent({ name: '', rollNumber: '', classNo: '', address: '', contactDetails: '', feeAmount: '' });
      getStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      getStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/students/${selectedStudent._id}`, newStudent);
      setSelectedStudent(null);
      setNewStudent({ name: '', rollNumber: '', classNo: '', address: '', contactDetails: '', feeAmount: '' });
      getStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const selectStudentForEdit = (student) => {
    setSelectedStudent(student);
    setNewStudent({ name: student.name, rollNumber: student.rollNumber, classNo: student.classNo, address: student.address, contactDetails: student.contactDetails, feeAmount: student.feeAmount });
  };

  return (
    <div>
      <h2 style={{ color: 'red' }}>Student Enrollment Management</h2>
      {user && (user.role ==='admin' || user.role ==='student') && (
      <div><br/>
        <h3 style={{ color: 'red' }}>Add Student</h3>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Roll Number"
          value={newStudent.rollNumber}
          onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Class"
          value={newStudent.classNo}
          onChange={(e) => setNewStudent({ ...newStudent, classNo: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Address"
          value={newStudent.address}
          onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Contact Details"
          value={newStudent.contactDetails}
          onChange={(e) => setNewStudent({ ...newStudent, contactDetails: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Fee Amount"
          value={newStudent.feeAmount}
          onChange={(e) => setNewStudent({ ...newStudent, feeAmount: e.target.value })}
          required
        /> <br/>
        <button onClick={selectedStudent ? updateStudent : createStudent}>
          {selectedStudent ? 'Update' : 'Add'}
        </button>
        {selectedStudent && (
          <button onClick={() => { setSelectedStudent(null); setNewStudent({ name: '', rollNumber: '', classNo: '', address: '', contactDetails: '', feeAmount: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      )}
      <div className='studentList'>
        <h3 style={{ color: 'Red' }}>Students List</h3>
        <ul>
          {students.map((student) => (
            <div key={student._id} className='studentCard'>
              <li>
                Name: {student.name} <br/>
                Roll Number:  {student.rollNumber} <br/>
                Class:  {student.classNo} <br/>
                Address: {student.address} <br/>
                Details: {student.contactDetails} <br/>
                {user && (user.role ==='admin') && (
                  <div>
                    Fee Amount: Rs. {student.feeAmount} <br/>
                    <button onClick={() => selectStudentForEdit(student)}>Edit</button>
                    <button onClick={() => deleteStudent(student._id)}>Delete</button> 
                 </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <br></br>
    </div>
  );
};

export default StudentEnrollment;

