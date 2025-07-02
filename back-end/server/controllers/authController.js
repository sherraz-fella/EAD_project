const User = require('../models/User');

// Register user (no password hashing for simplicity)
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create user (password stored in plaintext - simplest approach)
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login user (plaintext password check)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};