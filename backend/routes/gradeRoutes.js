const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade'); // Require the Grade model
// const { authenticateToken } = require('../middleware/authMiddleware');
// const { authorize } = require('../middleware/roleMiddleware');

// Get all grades (only accessible to teachers)
router.get('/', async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new grade (only accessible to teachers)
router.post('/', async (req, res) => {
    try {
        // Ensure required fields are present in the request body
        const { rollNumber, classNo, subject, grade } = req.body;
        if (!rollNumber || !classNo || !subject || !grade) {
            return res.status(400).json({ message: 'Please provide rollNumber, classNo, subject, and grade' });
        }

        // // Validate studentId as a valid ObjectId
        // if (!mongoose.Types.ObjectId.isValid(studentId)) {
        //     return res.status(400).json({ message: 'Invalid studentId' });
        // }

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

// Get grade by ID (only accessible to teachers)
router.get('/:id',  getGrade, (req, res) => {
    res.json(res.grade);
});

// Update grade by ID (only accessible to teachers)
router.patch('/:id', getGrade, async (req, res) => {
    if (req.body.grade != null) {
        res.grade.grade = req.body.grade;
    }
    // Update other grade-related fields if needed
    try {
        const updatedGrade = await res.grade.save();
        res.json(updatedGrade);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete grade by ID (only accessible to teachers)
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
