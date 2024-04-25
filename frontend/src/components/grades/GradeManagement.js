import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GradeManagement.css'
const GradeManagement = () => {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ rollNumber: '', classNo: '', subject: '', grade: '' });
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    getGrades();
  }, []);
  
  const getGrades = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('http://localhost:5000/api/grades', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const createGrade = async () => {
    try {
      await axios.post('http://localhost:5000/api/grades', newGrade);
      setNewGrade({ rollNumber: '', classNo: '', subject: '', grade: '' });
      getGrades();
    } catch (error) {
      console.error('Error creating grade:', error);
    }
  };

  const deleteGrade = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/grades/${id}`);
      getGrades();
    } catch (error) {
      console.error('Error deleting grade:', error);
    }
  };

  const selectGradeForEdit = (grade) => {
    setSelectedGrade(grade);
    setNewGrade({ rollNumber: grade.rollNumber, classNo: grade.classNo, subject: grade.subject, grade: grade.grade });
  };

  const updateGrade = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/grades/${selectedGrade._id}`, newGrade);
      setSelectedGrade(null);
      setNewGrade({ rollNumber: '', classNo: '', subject: '', grade: '' });
      getGrades();
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'orange' }}>Grade Management</h2><br/>
      <div>
        <h3 style={{ color: 'orange' }}>Add Grade</h3>
        <input
          type="text"
          placeholder="Roll Number"
          value={newGrade.rollNumber}
          onChange={(e) => setNewGrade({ ...newGrade, rollNumber: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Class"
          value={newGrade.classNo}
          onChange={(e) => setNewGrade({ ...newGrade, classNo: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Subject"
          value={newGrade.subject}
          onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
        /> <br/>
        <input
          type="text"
          placeholder="Score"
          value={newGrade.grade}
          onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
        /> <br/>
        <button onClick={selectedGrade ? updateGrade : createGrade}>
          {selectedGrade ? 'Update' : 'Add'}
        </button>
        {selectedGrade && (
          <button onClick={() => { setSelectedGrade(null); setNewGrade({ rollNumber: '', classNo: '', subject: '', grade: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <br/>
      <div>
        <h3 style={{ color: 'orange' }}>Grades List</h3>
        <ul>
          {grades.map((grade) => (
            <div key={grade._id} className='gradeCard'>
              <li>
                Roll Number: {grade.rollNumber} <br/>
                Class: {grade.classNo} <br/>
                Subject: {grade.subject} <br/>
                Score: {grade.grade} <br/>
                <button onClick={() => selectGradeForEdit(grade)}>Edit</button>
                <button onClick={() => deleteGrade(grade._id)}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GradeManagement;
