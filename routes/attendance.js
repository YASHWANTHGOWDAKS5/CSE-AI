// backend/routes/attendance.js

const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const authenticateToken = require('../middleware/auth'); 
// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// ✅ Save Attendance Entry — updated to accept `records` instead of `entries`
router.post('/upload', authMiddleware, async (req, res) => {
  try {
    const { records } = req.body; // ✅ Fix here
    if (!records || !Array.isArray(records)) {
      return res.status(400).json({ error: 'Invalid records payload' });
    }

    const recordsWithDate = records.map(entry => ({
      ...entry,
      date: entry.date ? new Date(entry.date) : new Date()
    }));

    await Attendance.insertMany(recordsWithDate);
    res.status(200).json({ message: 'Attendance uploaded successfully!' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload attendance' });
  }
});
// backend/routes/attendance.js
router.get('/by-faculty', authenticateToken, async (req, res) => {
  try {
    const facultyEmail = req.user.email;
    const records = await Attendance.find({ facultyEmail }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

module.exports = router;
