const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade'); // Require the Grade model

// Get all grades 
router.get('/', async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new grade
router.post('/', async (req, res) => {
    try {
        // Ensure required fields are present in the request body
        const { rollNumber, classNo, subject, grade } = req.body;
        if (!rollNumber || !classNo || !subject || !grade) {
            return res.status(400).json({ message: 'Please provide rollNumber, classNo, subject, and grade' });
        }

        // Create a new grade instance
        const newGrade = new Grade({
            rollNumber,
            classNo,
            subject,
            grade
        });

        // Save the new grade to the database
        const savedGrade = await newGrade.save();

        // Respond with the created grade
        res.status(201).json(savedGrade);
    } catch (err) {
        // Handle any errors that occur during the process
        res.status(400).json({ message: err.message });
    }
});

// Get grade by ID 
router.get('/:id',  getGrade, (req, res) => {
    res.json(res.grade);
});

// Update grade by ID 
router.patch('/:id', getGrade, async (req, res) => {
    if (req.body.rollNumber != null) {
        res.grade.rollNumber = req.body.rollNumber;
    }
    if (req.body.classNo != null) {
        res.grade.classNo = req.body.classNo;
    }
    if (req.body.subject != null) {
        res.grade.subject = req.body.subject;
    }
    if (req.body.grade != null) {
        res.grade.grade = req.body.grade;
    }
    try {
        const updatedGrade = await res.grade.save();
        res.json(updatedGrade);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete grade by ID 
router.delete('/:id', getGrade, async (req, res) => {
    if (req.body.grade != null) {
        res.grade.grade = req.body.grade;
    }
    try {
        const deleteGrade = await res.grade.deleteOne();
        res.json({ message: 'Grade deleted', deleteGrade});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get grade by ID
async function getGrade(req, res, next) {
    let grade;
    try {
        grade = await Grade.findById(req.params.id);
        if (grade == null) {
            return res.status(404).json({ message: 'Grade not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.grade = grade;
    next();
}

module.exports = router;
