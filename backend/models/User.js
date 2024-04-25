// // models/User.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['student', 'teacher', 'admin', 'staff'],
//         required: true
//     }
// });

// module.exports = mongoose.model('User', userSchema);
// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'], // Removed 'staff' as it wasn't mentioned in the frontend dropdown
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
