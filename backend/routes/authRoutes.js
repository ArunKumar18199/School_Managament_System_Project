// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const secretKey = "secretKey123";


// function authenticator(req, res, next) {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const decodedToken = jwt.verify(token, secretKey);
//     if (decodedToken) {
//         req.user = decodedToken; // Save the decoded token in the request object
//         next();
//     } else {
//         next(new Error("Not a Valid user"));
//     }
// }

// // Register
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         // Check if the username already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // Create a new user
//         const newUser = new User({ name, email, password: hashedPassword, role });
//         await newUser.save();
//         const token = jwt.sign({ id: newUser._id, role: newUser.role }, secretKey, {expiresIn: '1h'});
//         res.status(201).json({ message: 'User created successfully' , token});
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {expiresIn: '1h'});
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// router.use(authenticator);

// module.exports = router;


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const secretKey = "secretKey123";
const { authenticateToken } = require('../middleware/authMiddleware');

function authenticator(req, res, next) {
    try {
        const token = req.header.authorization.split(" ")[1];
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


// Register
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, secretKey, {expiresIn: '1h'});
        res.status(201).json({ message: 'User created successfully' , token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// function authenticator(req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       throw new Error('No authorization header provided');
//     }

//     const tokenType = authHeader.split(' ')[0];
//     if (tokenType.toLowerCase() !== 'bearer') {
//       throw new Error('Invalid authorization header format');
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       throw new Error('No token provided');
//     }

//     const decodedToken = jwt.verify(token, secretKey);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Unauthorized' });
//   }
// }

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
        res.json({ success: true, message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         // if (!user) {
//         //     return res.status(400).json({ success: false, message: 'Email not found' });
//         // }
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(400).json({ success: false, message: 'Invalid password' });
//         }
//         const token = jwt.sign({ id: user._id}, secretKey, {expiresIn: '1h'});
//         res.json({ success: true, message: 'Login successful', token });
//     } catch (err) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

router.use(authenticator);

module.exports = router;
