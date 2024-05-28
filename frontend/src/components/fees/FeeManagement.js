import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './FeeManagement.css'

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState({
    rollNumber: '',
    classNo: '',
    feeAmount: '',
    totalFeePaid: '',
    nextPaymentDue: ''
  });
  const [selectedFee, setSelectedFee] = useState(null);
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fees');
        setFees(response.data);
        setUser(location.state.user);
      } catch (error) {
        console.error('Error fetching fees:', error.message);
      }
    };
    fetchFees();
  }, [location.state]);

  const fetchFees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fees');
      setFees(response.data);
      setUser(location.state.user);
    } catch (error) {
      console.error('Error fetching fees:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewFee({ ...newFee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/fees', newFee);
      fetchFees();
      setNewFee({
        rollNumber: '',
        classNo: '',
        feeAmount: '',
        totalFeePaid: '',
        nextPaymentDue: ''
      });
    } catch (error) {
      console.error('Error adding fee:', error.message);
    }
  };

  const deleteFee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fees/${id}`);
      fetchFees();
    } catch (error) {
      console.error('Error deleting fee:', error.message);
    }
  };

  const selectFeeForEdit = (fee) => {
    setSelectedFee(fee);
    setNewFee({
      rollNumber: fee.rollNumber,
      classNo: fee.classNo,
      feeAmount: fee.feeAmount,
      totalFeePaid: fee.totalFeePaid,
      nextPaymentDue: fee.nextPaymentDue
    });
  };

  const updateFee = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/fees/${selectedFee._id}`, newFee);
      setSelectedFee(null);
      setNewFee({
        rollNumber: '',
        classNo: '',
        feeAmount: '',
        totalFeePaid: '',
        nextPaymentDue: ''
      });
      fetchFees();
    } catch (error) {
      console.error('Error updating fee:', error.message);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'orange' }}>Fee Management</h2>
      {user && (user.role ==='admin') && (
      <div><br/>
        <h3 style={{ color: 'orange' }}>Add Fee</h3>
        <input
          type="text"
          name="rollNumber"
          value={newFee.rollNumber}
          onChange={handleInputChange}
          placeholder="Roll Number"
        /> <br />
        <input
          type="text"
          name="classNo"
          value={newFee.classNo}
          onChange={handleInputChange}
          placeholder="Class"
        /> <br />
        <input
          type="number"
          name="feeAmount"
          value={newFee.feeAmount}
          onChange={handleInputChange}
          placeholder="Fee Amount"
        /> <br />
        <input
          type="number"
          name="totalFeePaid"
          value={newFee.totalFeePaid}
          onChange={handleInputChange}
          placeholder="Total Fee Paid"
        /> <br />
        <input
          type="date"
          name="nextPaymentDue"
          value={newFee.nextPaymentDue}
          onChange={handleInputChange}
          placeholder="Next Payment Due"
        /> <br />
        <button onClick={selectedFee ? updateFee : handleSubmit}>
          {selectedFee ? 'Update' : 'Add'}
        </button>
        {selectedFee && (
          <button onClick={() => { setSelectedFee(null); setNewFee({ rollNumber: '', classNo: '', feeAmount: '', totalFeePaid: '', nextPaymentDue: '' }); }}>
            Cancel
          </button>
        )}
      </div>
      )}
            <br />
      <div>
        <h3 style={{ color: 'orange' }}>Fee List</h3>
        <ul>
          {fees.map((fee) => (
            <div key={fee._id} className='feeCard'>
              <li>
                Roll Number: {fee.rollNumber} <br />
                Class: {fee.classNo} <br />
                Fee Amount: {fee.feeAmount} <br />
                Total Fee Paid: {fee.totalFeePaid} <br />
                Next Payment Due: {fee.nextPaymentDue} <br />
                {user && (user.role ==='admin') && (
                <div>
                <button onClick={() => selectFeeForEdit(fee)}>Edit</button> 
                <button onClick={() => deleteFee(fee._id)}>Delete</button>
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

export default FeeManagement;
