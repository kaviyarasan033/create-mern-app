const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/items
router.get('/', auth, ItemController.index.bind(ItemController));

// @route   POST api/items
router.post('/', auth, ItemController.store.bind(ItemController));

// @route   PUT api/items/:id
router.put('/:id', auth, ItemController.update.bind(ItemController));

// @route   DELETE api/items/:id
router.delete('/:id', auth, ItemController.destroy.bind(ItemController));

module.exports = router;
