const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.json({ message: 'Signup Successful ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    if (user.password !== password) return res.status(400).json({ error: 'Invalid Password' });

    res.json({ message: 'Login Successful ✅', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
