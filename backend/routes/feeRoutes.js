const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee');

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
    try {
        const { rollNumber, classNo, feeAmount, totalFeePaid, nextPaymentDue } = req.body;
        if (!rollNumber || !classNo || !feeAmount || !totalFeePaid || !nextPaymentDue) {
            return res.status(400).json({ message: 'Please provide all details' });
        }
        const fee = new Fee({
            rollNumber,
            classNo,
            feeAmount,
            totalFeePaid,
            nextPaymentDue
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
        if (req.body.rollNumber != null) {
            res.fee.rollNumber = req.body.rollNumber;
        }
        if (req.body.classNo != null) {
            res.fee.classNo = req.body.classNo;
        }
        if (req.body.feeAmount != null) {
            res.fee.feeAmount = req.body.feeAmount;
        }
        if (req.body.totalFeePaid != null) {
            res.fee.totalFeePaid = req.body.totalFeePaid;
        }
        if (req.body.nextPaymentDue != null) {
            res.fee.nextPaymentDue = req.body.nextPaymentDue;
        }
        
        const updatedFee = await res.fee.save();
        res.json(updatedFee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete fee payment
router.delete('/:id', getFee, async (req, res) => {
    if (req.body.fee != null) {
        res.fee.fee = req.body.fee;
    }
    try {
        const deleteGrade = await res.fee.deleteOne();
        res.json({ message: 'Grade deleted', deleteGrade});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
