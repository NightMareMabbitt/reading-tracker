const express = require('express');
const { addBookToShelf, getBookInShelf, updateBookProgress, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.route('/:shelfId').post(addBookToShelf).get(getBookInShelf);
router.route('/:id').put(updateBookProgress).delete(deleteBook);

module.exports = router;
