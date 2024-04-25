// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = "secretKey123";


function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        // res.status(403).json({ message: 'Invalid token' });
        console.error('JWT verification failed:', err);
        // Optionally, you can send an error response to the client
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = { authenticateToken };
