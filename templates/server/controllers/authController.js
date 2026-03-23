const Controller = require('./Controller');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController extends Controller {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return this.sendError(res, 'User already exists', 400);

      user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
      this.sendResponse(res, { token, user: user.toSafeObject() }, 'Registration successful', 201);
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return this.sendError(res, 'Invalid credentials', 400);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return this.sendError(res, 'Invalid credentials', 400);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });
      this.sendResponse(res, { token, user: user.toSafeObject() }, 'Login successful');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async logout(req, res) {
    this.sendResponse(res, null, 'Logged out successfully');
  }

  async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return this.notFound(res, 'User not found');
      this.sendResponse(res, user.toSafeObject(), 'Current user fetched');
    } catch (err) {
      this.sendError(res, err);
    }
  }
}

module.exports = new AuthController();
