const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes middleware
const authMiddleware = async (req, res, next) => {
  try {
    console.log('Auth middleware running');
    console.log('Cookies received:', req.cookies);

    // Get token from cookie
    const token = req.cookies.jwtPrac;

    if (!token) {
      console.log('No jwtPrac cookie found');
      return res.status(401).json({
        success: false,
        message: 'You are not logged in. Please log in to get access',
      });
    }

    console.log('Token found, verifying...');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified, user ID:', decoded._id);

    // Find the user by ID
    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
      console.log('User not found in database');
      return res.status(401).json({
        success: false,
        message: 'Token expired, please log in again',
      });
    }

    console.log('User found:', currentUser.email);

    // Grant access to the protected routes
    currentUser.password = undefined;
    req.user = currentUser;
    console.log('Middleware - User attached to req:', req.user);
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.',
      });
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your token has expired. Please log in again.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = authMiddleware;
