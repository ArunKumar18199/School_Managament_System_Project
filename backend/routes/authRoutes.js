const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const secretKey = "secretKey123";

function authenticator(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("No token provided");
        }
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}


router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, secretKey, {expiresIn: '1h'});
        res.status(201).json({ message: 'User created successfully' , token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {expiresIn: '1h'});
        res.json({ success: true, message: 'Login successful', token , role: user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/:role', async (req, res) => {
    try {
      const users = await User.find({ role: req.params.role });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  });

router.use(authenticator);

router.get('/api/example', authenticator, (req, res) => {
    res.status(200).json('This is a protected route');
  });
  

module.exports = router;
