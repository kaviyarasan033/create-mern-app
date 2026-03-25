const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validation');

// @route   POST api/auth/register
router.post('/register', validateRegister, handleValidationErrors, AuthController.register.bind(AuthController));

// @route   POST api/auth/login
router.post('/login', validateLogin, handleValidationErrors, AuthController.login.bind(AuthController));

// @route   POST api/auth/logout
router.post('/logout', AuthController.logout.bind(AuthController));

// @route   GET api/auth/me
router.get('/me', auth, AuthController.getCurrentUser.bind(AuthController));

// @route   POST api/auth/refresh
router.post('/refresh', auth, AuthController.refreshToken.bind(AuthController));

// @route   POST api/auth/google
router.post('/google', AuthController.googleAuth.bind(AuthController));

module.exports = router;
