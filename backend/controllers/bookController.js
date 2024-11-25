const Book = require('../models/Book');
const Shelf = require('../models/Shelf');

// Add a book to a shelf
const addBookToShelf = async (req, res) => {
  const { title, author, progress } = req.body;
  const { shelfId } = req.params; // Shelf ID passed as a URL parameter

  try {
    // Find the shelf and check if it belongs to the user
    const shelf = await Shelf.findById(shelfId);

    if (!shelf || shelf.user.toString() != req.user.id) {
      return res.status(404).json({ message: 'Shelf not found or not authorised'});
  }

  const newBook = await Book.create({
    title, 
    author, 
    progress,
    shelf: shelfId,
    user: req.user.id, //User ID for security
  });

  res.status(201).json(newBook);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

// Get all books in a shelf
