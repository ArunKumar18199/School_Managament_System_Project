import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, FormControl, Select, InputLabel, TextField, Button } from '@material-ui/core';
import './Chat.css'; 

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  messageContainer: {
    marginTop: theme.spacing(2),
  },
  chatBox: {
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    maxHeight: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  chatInput: {
    marginTop: theme.spacing(2),
  },
  message: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    borderRadius: '10px',
    maxWidth: '60%',
    wordBreak: 'break-word',
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white',
  },
}));

const Chat = (user) => {
  const classes = useStyles();
  const [roles] = useState(['admin', 'teacher', 'student']);
  const [selectedRole, setSelectedRole] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const currentUser = ""+user.user._id+"";

  useEffect(() => {
    if (selectedRole) {
      fetchUsers(selectedRole);
    }
  }, [selectedRole]);

  const fetchUsers = async (role) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/${role}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };  

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setSelectedUser('');
    setUsers([]);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    fetchMessages(currentUser, event.target.value); // Fetch messages when user changes
  };

  const handleRefresh = () => {
    fetchMessages(currentUser, selectedUser);
  };


  const fetchMessages = async (sender, recipient) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${sender}/${recipient}`);
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;
  
    try {
      const senderResponse = await axios.get(`http://localhost:5000/api/auth/${currentUser}`);
      const senderName = senderResponse.data.name;

      await axios.post('http://localhost:5000/api/messages', {
        sender: currentUser,
        senderName: senderName,
        recipient: selectedUser,
        message: message,
      });
  
      setChatMessages([...chatMessages, { sender: currentUser, message: message, timestamp: new Date() }]);
      setMessage('');
      handleRefresh();
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} disabled={!selectedRole}>
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUser}
          onChange={handleUserChange}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className={classes.chatInput}
        label="Type a message"
        multiline
        rows={4}
        variant="outlined"
        value={message}
        onChange={handleMessageChange}
        fullWidth
      />
      <Button
        className={classes.chatInput}
        variant="contained"
        color="primary"
        onClick={sendMessage}
        disabled={!selectedUser || !message.trim()}
      >
        Send
      </Button>
      <Button
        className={classes.chatInput}
        variant="contained"
        color="primary"
        onClick={handleRefresh}
        disabled={!selectedUser}
      >
        Refresh
      </Button>

      <div className={classes.messageContainer}>
        <div className={classes.chatBox}>
          {chatMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`${classes.message} ${msg.sender === currentUser ? classes.messageRight : classes.messageLeft}`}
            >
              <strong>{msg.senderName}:</strong> {msg.message}
              <div>{formatTimestamp(msg.timestamp)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
