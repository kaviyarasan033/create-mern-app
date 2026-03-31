const mongoose = require('mongoose');
const { getMySqlPool, isMySqlEnabled } = require('../config/mysql');

// MongoDB Schema
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['draft', 'active', 'archived'], default: 'active' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const MongoItem = mongoose.model('Item', ItemSchema);

/**
 * Agnostic Model Wrapper
 */
class ItemModel {
  constructor() {
    this.useSql = isMySqlEnabled();
  }

  async find(filter = {}) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      let query = 'SELECT * FROM items';
      const params = [];
      if (filter.user) {
        query += ' WHERE userId = ?';
        params.push(filter.user);
      }
      query += ' ORDER BY createdAt DESC';
      const [rows] = await pool.query(query, params);
      return rows;
    }
    return await MongoItem.find(filter).sort({ createdAt: -1 });
  }

  async findById(id) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
      return rows[0];
    }
    return await MongoItem.findById(id);
  }

  async create(itemData) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const { name, description, status, user } = itemData;
      const [result] = await pool.query(
        'INSERT INTO items (name, description, status, userId) VALUES (?, ?, ?, ?)',
        [name, description, status || 'active', user]
      );
      return { id: result.insertId, ...itemData };
    }
    return await MongoItem.create(itemData);
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const { name, description, status } = updateData;
      await pool.query(
        'UPDATE items SET name = ?, description = ?, status = ? WHERE id = ?',
        [name, description, status, id]
      );
      return await this.findById(id);
    }
    return await MongoItem.findByIdAndUpdate(id, updateData, { new: true, ...options });
  }

  async findByIdAndDelete(id) {
    if (this.useSql) {
      const pool = await getMySqlPool();
      const item = await this.findById(id);
      await pool.query('DELETE FROM items WHERE id = ?', [id]);
      return item;
    }
    return await MongoItem.findByIdAndDelete(id);
  }
}

module.exports = new ItemModel();
module.exports.MongoModel = MongoItem;
