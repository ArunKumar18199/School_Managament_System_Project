const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: true
    },
    classNo: {
        type: String,
        required: true
    },
    feeAmount: {
        type: Number,
        required: true
    },
    totalFeePaid: {
        type: Number,
        required: true
    },
    nextPaymentDue: {
        type: Date, // Assuming next payment due is a date
        required: true
    }
});

module.exports = mongoose.model('Fee', feeSchema);
