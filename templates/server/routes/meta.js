const express = require('express');

const router = express.Router();
const MetaController = require('../controllers/MetaController');

router.get('/', MetaController.index.bind(MetaController));

module.exports = router;
