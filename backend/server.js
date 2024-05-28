const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const staffRoutes = require('./routes/staffRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const feeRoutes = require('./routes/feeRoutes');
const messageRoutes = require('./routes/messages');
const timeTableRoutes = require('./routes/timeTableRoutes');
const multer = require("multer")
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
// app.use('/api/admins', adminRoutes);
// app.use('/api/staff', staffRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/timetables',timeTableRoutes);
app.use(express.static("public/images"))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const user = {
    id: 1,
    avatar: 'http://localhost:5000/images/default-avatar.png'
  };

let latestImageUrl = '';
app.post("/upload",upload.single('file'),(req,res)=>{
    if(!req.file){
        res.status(400).send("No FIle uploaded");
    }
    
    const imageUrl = `http://localhost:5000/images/${req.file.filename}`;

    if(latestImageUrl) {
        const previousFileName = latestImageUrl.split('/').pop();
        console.log({previousFileName});
        const previousFilePath = path.join("public/images", previousFileName);
        fs.unlink(previousFilePath,(err) => {
            if (err) {
                console.log('Error deleting file: ', err);
            } else {
                console.log('Previous file deleted successfully');
            }
        });
        console.log({previousFilePath});
    }
    latestImageUrl = imageUrl;
    user.avatar = imageUrl;
    res.json({imageUrl:imageUrl});
});

app.get('/avatar', (req, res) => {
    // Fetch avatar URL from user's profile in your database
    res.send({ avatarUrl: user.avatar });
  });

  app.delete('/remove-avatar', (req, res) => {
    // Remove the avatar from the "database"
    user.avatar = 'http://localhost:5000/images/default-avatar.png';
    res.sendStatus(200);
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
