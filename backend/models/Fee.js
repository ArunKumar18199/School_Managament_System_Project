const mongoose = require('mongoose');
// const Student = require('./Student');

const feeSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        ref: 'Student',
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    feeAmount: {
        type: Number,
        required: true
    }
    // Add other fee-related fields as needed
});

module.exports = mongoose.model('Fee', feeSchema);
