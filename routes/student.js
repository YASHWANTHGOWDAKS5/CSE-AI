const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 }); // Sort by name
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// POST new student
router.post('/', async (req, res) => {
  const { name, usn, branch, semester, email } = req.body;

  if (!name || !usn || !branch || !semester || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newStudent = new Student({ name, usn, branch, semester, email });
    await newStudent.save();
    res.json({ message: 'Student added successfully' });
  } catch (err) {
    console.error('Error saving student:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

module.exports = router;
