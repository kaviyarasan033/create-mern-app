const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { getMySqlPool, isMySqlEnabled } = require('../config/mysql');

// MongoDB Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Optional for Google auth users
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  authProvider: { 
    type: String, 
    enum: ['local', 'google'], 
    default: 'local' 
  },
  googleId: { type: String, sparse: true },
  photoURL: { type: String }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt
  };
};

const MongoUser = mongoose.model('User', UserSchema);

/**
 * Agnostic Model Wrapper
 */
class UserModel {
  constructor() {
    this.useSql = isMySqlEnabled();
  }

  async find() {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const [rows] = await pool.query('SELECT * FROM users ORDER BY createdAt DESC');
      return rows;
    }
    return await MongoUser.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    }
    return await MongoUser.findById(id);
  }

  async findByEmail(email) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    }
    return await MongoUser.findOne({ email });
  }

  async create(userData) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const { name, email, password, role } = userData;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role || 'user']
      );
      return { id: result.insertId, ...userData };
    }
    return await MongoUser.create(userData);
  }
}

module.exports = new UserModel();
module.exports.MongoModel = MongoUser; // Export for advanced usage
