const Controller = require('./Controller');
const Item = require('../models/Item');

class ItemController extends Controller {
  async index(req, res) {
    try {
      const items = await Item.find({ user: req.user.id }).sort({ createdAt: -1 });
      this.sendResponse(res, items, 'Items fetched successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async store(req, res) {
    try {
      const { name, description, status } = req.body;
      const newItem = new Item({
        name,
        description,
        status,
        user: req.user.id
      });
      const item = await newItem.save();
      this.sendResponse(res, item, 'Item created successfully', 201);
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async update(req, res) {
    try {
      const item = await Item.findOne({ _id: req.params.id, user: req.user.id });
      if (!item) return this.notFound(res, 'Item not found');

      item.name = req.body.name ?? item.name;
      item.description = req.body.description ?? item.description;
      item.status = req.body.status ?? item.status;

      await item.save();
      this.sendResponse(res, item, 'Item updated successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async destroy(req, res) {
    try {
      const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!item) return this.notFound(res, 'Item not found');
      this.sendResponse(res, item, 'Item deleted successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }
}

module.exports = new ItemController();
