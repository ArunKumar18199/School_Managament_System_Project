const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new student
router.post('/', async (req, res) => {
    const { name, rollNumber, classNo, address, contactDetails, feeAmount } = req.body;
    try {
        const student = new Student({
            name,
            rollNumber,
            classNo,
            address,
            contactDetails,
            feeAmount
        });
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get student by ID
router.get('/:id', getStudent, (req, res) => {
    res.json(res.student);
});

// Middleware function to get student by ID
async function getStudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.student = student;
    next();
}

// Update student
router.patch('/:id', getStudent, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.student.name = req.body.name;
        }
        if (req.body.rollNumber != null) {
            res.student.rollNumber = req.body.rollNumber;
        }
        if (req.body.classNo != null) {
            res.student.classNo = req.body.classNo;
        }
        if (req.body.address != null) {
            res.student.address = req.body.address;
        }
        if (req.body.contactDetails != null) {
            res.student.contactDetails = req.body.contactDetails;
        }
        if (req.body.feeAmount != null) {
            res.student.feeAmount = req.body.feeAmount;
        }
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete student
router.delete('/:id', getStudent, async (req, res) => {
    try {
        await res.student.deleteOne();
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
