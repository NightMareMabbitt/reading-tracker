const express = require('express');
const { addOrUpdateProgress, getProgress, getAllProgress, deleteProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addOrUpdateProgress);// Add or Update Progress
router.get('/:bookId', protect, getProgress); // Get progress for a book
router.get('/', protect, getAllProgress); // Get all progress
router.delete('/:id', protect, deleteProgress); // Delete progress 


module.exports = router;