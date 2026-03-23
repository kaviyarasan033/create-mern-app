let items = [
  { id: 1, name: 'Item 1', description: 'First item', createdAt: new Date() },
  { id: 2, name: 'Item 2', description: 'Second item', createdAt: new Date() }
];

const apiController = {
  getItems: (req, res) => {
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  },

  getItem: (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }
    res.json({ success: true, data: item });
  },

  createItem: (req, res) => {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      name,
      description: description || '',
      createdAt: new Date()
    };

    items.push(newItem);
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  },

  updateItem: (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    const { name, description } = req.body;
    item.name = name || item.name;
    item.description = description !== undefined ? description : item.description;

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  },

  deleteItem: (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    const deletedItem = items.splice(index, 1);
    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: deletedItem[0]
    });
  }
};

module.exports = apiController;
