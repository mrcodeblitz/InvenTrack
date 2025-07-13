const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login:', username, password); 
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    console.log(result.rows[0]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const user = result.rows[0];
    // console.log(await bcrypt.compare(password, user.password));
    const match = password === user.password;
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', (req, res) => {
  // Since JWT is stateless, logout is handled on client side by deleting the token.
  // Optionally, you can implement token blacklisting here.
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;