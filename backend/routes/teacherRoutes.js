const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher'); // Assuming you have a Teacher model defined

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new teacher
router.post('/', async (req, res) => {
  const { name, email, employeeId, classNos, subjects, address, contactDetails, salaryAmount } = req.body;

  try {
    const newTeacher = new Teacher({
      name,
      email,
      employeeId,
      classNos,
      subjects,
      address,
      contactDetails,
      salaryAmount
    });

    const teacher = await newTeacher.save();
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update teacher
router.patch('/:id', async (req, res) => {
  const { name, email, employeeId, classNos, subjects, address, contactDetails, salaryAmount } = req.body;

  try {
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, employeeId, classNos, subjects, address, contactDetails, salaryAmount } },
      { new: true }
    );

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete teacher
router.delete('/:id', async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    await Teacher.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Teacher removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
