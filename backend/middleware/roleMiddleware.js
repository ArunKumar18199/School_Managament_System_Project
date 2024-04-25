// middleware/roleMiddleware.js

function authorize(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    };
}

module.exports = { authorize };
