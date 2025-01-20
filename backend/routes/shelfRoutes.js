const express = require('express');
const { createShelf, getShelves, updateShelf, deleteShelf } = require('../controllers/shelfController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getShelves).post(protect, createShelf);
router.route('/:id').put(protect, updateShelf).delete(protect, deleteShelf);

module.exports = router;
