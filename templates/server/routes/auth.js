const { validateRegister, validateLogin, handleValidationErrors } = require('../Middleware/validation');

// @route   POST api/auth/register
router.post('/register', validateRegister, handleValidationErrors, AuthController.register.bind(AuthController));

// @route   POST api/auth/login
router.post('/login', validateLogin, handleValidationErrors, AuthController.login.bind(AuthController));

// @route   POST api/auth/logout
router.post('/logout', AuthController.logout.bind(AuthController));

// @route   GET api/auth/me
router.get('/me', AuthController.getCurrentUser.bind(AuthController));

module.exports = router;
