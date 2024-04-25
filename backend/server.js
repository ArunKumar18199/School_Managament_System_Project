// app.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
// const teacherRoutes = require('./routes/teacherRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const staffRoutes = require('./routes/staffRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const feeRoutes = require('./routes/feeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/admins', adminRoutes);
// app.use('/api/staff', staffRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/fees', feeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
