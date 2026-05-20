const Progress = require('../models/Progress');
const Book = require('../models/Book');

const addOrUpdateProgress = async (req, res) => {
  // Add or Update Progress
  const { bookId, progress, pagesRead } = req.body;

  try {
    // Ensure the book exists and belongs to the user
    const book = await Book.findById(bookId);
    if (!book || book.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Book not found or not authorised' });
    }

    // Find the user's progress for the book
    let userProgress = await Progress.findOne({ book: bookId, user: req.user.id });
    if (!userProgress) {
      // Create a new progress record
      userProgress = await Progress.create({
        book: bookId,
        user: req.user.id,
        progress,
        pagesRead,
        completed: progress === 100, // automatically mark as completed if the progress is at 100
      });
    } else {
      userProgress.progress = progress;
      if (typeof pagesRead === 'number') {
        userProgress.pagesRead = pagesRead;
      }
      userProgress.completed = progress === 100;
      await userProgress.save();
    }
    res.status(200).json(userProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get progress for a book
const getProgress = async (req, res) => {
  const { bookId } = req.params;

  try {
    const userProgress = await Progress.findOne({ book: bookId, user: req.user.id });

    if (!userProgress) {
      return res.status(404).json({ message: 'No progress found for this book' });
    }
    res.status(200).json(userProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllProgress = async (req, res) => {
  try {
    const allProgress = await Progress.find({ user: req.user.id });
    res.status(200).json(allProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProgress = async (req, res) => {
  const { id } = req.params;

  try {
    const progress = await Progress.findById(id);

    if (!progress || progress.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Progress not found or not authorised'});
    }
    await progress.remove();
    res.status(200).json({ message: 'Progress removed'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addOrUpdateProgress, getProgress, getAllProgress, deleteProgress };



