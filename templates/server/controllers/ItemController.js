const Controller = require('./Controller');
const Item = require('../models/Item');

class ItemController extends Controller {
  async index(req, res) {
    try {
      const items = await Item.find({ user: req.user.id });
      this.sendResponse(res, items, 'Items fetched successfully');
    } catch (err) {
      this.sendError(res, err);
    }
  }

  async store(req, res) {
    try {
      const { name, description } = req.body;
      const newItem = new Item({
        name,
        description,
        user: req.user.id
      });
      const item = await newItem.save();
      this.sendResponse(res, item, 'Item created successfully', 201);
    } catch (err) {
      this.sendError(res, err);
    }
  }
}

module.exports = new ItemController();
