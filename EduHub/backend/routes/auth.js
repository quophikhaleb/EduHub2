// routes/auth.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to the users.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from the file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to write users to the file
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// @route   POST /api/auth/login
// @desc    Authenticate user
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter both email and password.' });
  }

  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({ message: 'Login successful', userId: user.id });
});

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const users = readUsers();
  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'Signup successful', userId: newUser.id });
});

module.exports = router;


