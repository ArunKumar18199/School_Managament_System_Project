const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    classNos: [{
        type: String,
        required: true
    }],
    subjects: [{
        type: String,
        required: true
    }],
    address: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    salaryAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Teacher', teacherSchema);
