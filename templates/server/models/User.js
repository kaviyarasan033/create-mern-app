const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  // Skip password hashing for Google auth users without passwords
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

module.exports = mongoose.model('User', UserSchema);
