const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee');
const Student = require('../models/Student');

// Get all fees
router.get('/', async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json(fees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new fee payment
router.post('/', async (req, res) => {
    const { rollNumber, amount } = req.body;
    try {
        // Check if studentId is valid
        const student = await Student.findById(rollNumber);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const fee = new Fee({
            rollNumber,
            Class,
            amount
        });
        const newFee = await fee.save();
        res.status(201).json(newFee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get fee payment by ID
router.get('/:id', getFee, (req, res) => {
    res.json(res.fee);
});

// Middleware function to get fee payment by ID
async function getFee(req, res, next) {
    let fee;
    try {
        fee = await Fee.findById(req.params.id);
        if (fee == null) {
            return res.status(404).json({ message: 'Fee payment not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.fee = fee;
    next();
}

// Update fee payment
router.patch('/:id', getFee, async (req, res) => {
    try {
        if (req.body.amount != null) {
            res.fee.amount = req.body.amount;
        }
        // Update other fee-related fields as needed
        const updatedFee = await res.fee.save();
        res.json(updatedFee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete fee payment
router.delete('/:id', getFee, async (req, res) => {
    try {
        await res.fee.remove();
        res.json({ message: 'Fee payment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
