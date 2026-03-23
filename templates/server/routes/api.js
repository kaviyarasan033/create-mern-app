const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/items
router.get('/', auth, ItemController.index.bind(ItemController));

// @route   POST api/items
router.post('/', auth, ItemController.store.bind(ItemController));

module.exports = router;
