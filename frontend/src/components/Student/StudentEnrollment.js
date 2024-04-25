// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StudentEnrollment = () => {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({ name: '', rollNumber: '', address: '', contactDetails: '', feeAmount: '' });
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     getStudents();
//   }, []);

//   const getStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/students'); // Updated to use relative path
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const createStudent = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/students', newStudent); // Updated to use relative path
//       setNewStudent({ name: '', rollNumber: '', address: '', contactDetails: '', feeAmount: '' });
//       getStudents();
//     } catch (error) {
//       console.error('Error creating student:', error);
//     }
//   };

//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/students/${id}`); // Updated to use relative path
//       getStudents();
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };

//   const selectStudentForEdit = (student) => {
//     setSelectedStudent(student);
//     setNewStudent({ name: student.name, rollNumber: student.rollNumber, address: student.address, contactDetails: student.contactDetails, feeAmount: student.feeAmount });
//   };

//   return (
//     <div>
//       <h2 style={{ color: 'white' }}>Student Enrollment Management</h2>
//       <div>
//         <h3 style={{ color: 'white' }}>Add Student</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newStudent.name}
//           onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Roll Number"
//           value={newStudent.rollNumber}
//           onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={newStudent.address}
//           onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Contact Details"
//           value={newStudent.contactDetails}
//           onChange={(e) => setNewStudent({ ...newStudent, contactDetails: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Fee Amount"
//           value={newStudent.feeAmount}
//           onChange={(e) => setNewStudent({ ...newStudent, feeAmount: e.target.value })}
//         />
//         <button onClick={createStudent}>Add</button>
//       </div>
//       <div className='studentList'>
//       <h3 style={{ color: 'Red' }}>Students List</h3>
//       <ul>
//         {students.map((student) => (
//           <li key={student._id}>
//             {student.name} - {student.rollNumber} - {student.address} - {student.contactDetails} - {student.feeAmount}
//             <button onClick={() => selectStudentForEdit(student)}>Edit</button>
//             <button onClick={() => deleteStudent(student._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       </div>
//     </div>
//   );
// };


import './StudentEnrollment.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', rollNumber: '', address: '', contactDetails: '', feeAmount: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students'); // Updated to use relative path
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createStudent = async () => {
    try {
      await axios.post('http://localhost:5000/api/students', newStudent); // Updated to use relative path
      setNewStudent({ name: '', rollNumber: '', address: '', contactDetails: '', feeAmount: '' });
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
      setNewStudent({ name: '', rollNumber: '', address: '', contactDetails: '', feeAmount: '' });
      getStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const selectStudentForEdit = (student) => {
    setSelectedStudent(student);
    setNewStudent({ name: student.name, rollNumber: student.rollNumber, address: student.address, contactDetails: student.contactDetails, feeAmount: student.feeAmount });
  };

  return (
    <div>
      <h2 style={{ color: 'red' }}>Student Enrollment Management</h2><br/>
      <div>
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
          <button onClick={() => { setSelectedStudent(null); setNewStudent({ name: '', rollNumber: '', address: '', contactDetails: '', feeAmount: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      <br/>
      <div className='studentList'>
        <h3 style={{ color: 'Red' }}>Students List</h3>
        <ul>
          {students.map((student) => (
            <div key={student._id} className='studentCard'>
              <li>
                Name: {student.name} <br/>
                Roll.No:  {student.rollNumber} <br/>
                Address: {student.address} <br/>
                Details: {student.contactDetails} <br/>
                Fee Amount: Rs. {student.feeAmount} <br/>
                <button onClick={() => selectStudentForEdit(student)}>Edit</button>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentEnrollment;
