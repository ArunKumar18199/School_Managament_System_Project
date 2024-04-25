const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    rollNumber: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true
    },
    classNo: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Grade', gradeSchema);
