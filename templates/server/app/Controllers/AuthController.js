const Controller = require('./Controller');
const User = require('../Models/User');
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

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      this.sendResponse(res, { token, user: { id: user._id, name, email } }, 'Registration successful', 201);
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

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      this.sendResponse(res, { token, user: { id: user._id, name: user.name, email: user.email } }, 'Login successful');
    } catch (err) {
      this.sendError(res, err);
    }
  }
}

module.exports = new AuthController();
