const express = require('express');
const {
  googleLoginController,
  signInController,
  changePasswordController,
} = require('../controllers/authController');
const signUpController = require('../controllers/signUpController');
const authMiddleware = require('../middleware/authMiddleware');
const { logout } = require('../controllers/logoutController');
const checkAuthController = require('../controllers/checkAuthController');

const router = express.Router();

router.get('/google', googleLoginController);
router.post('/signup', signUpController);
router.post('/signin', signInController);
router.get('/logout', logout);
router.post('/changePassword', authMiddleware, changePasswordController);

// /check-auth - This is a protected route
router.get('/check-auth', authMiddleware, checkAuthController);

module.exports = router;
