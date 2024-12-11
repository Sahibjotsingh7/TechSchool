const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey"; // Ensure this matches your backend setup

const authenticateToken = (req, res, next) => {
    // Skip token check for public routes
    const publicRoutes = ['/auth/signup', '/auth/login', '/home', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-otp', '/auth/reset-email','/auth/delete-account','/run'];
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied: No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};

module.exports = authenticateToken;
