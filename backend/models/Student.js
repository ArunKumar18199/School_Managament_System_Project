const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
      },
      classNo: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      contactDetails: {
        type: String,
        required: true
      },
      feeAmount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
