const Shelf = require('../models/Shelf');

const createShelf = async( req, res) => {
  const { name } = req.body;

  try{ 
    const newShelf = await Shelf.create({
      name, 
      user: req.user.id, 
    });
    
    res.status(201).json(newShelf);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

//Get all shelves for a user
const getShelves = async (req, res) => {
  try {
    //Find all shelves belongng to the authenticated user
    const shelves = await Shelf.find({ user: req.user.id});

      res.status(200).json(shelves);    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shelf

const updateShelf = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  try {
    //Find the shelf by ID and make sure it belongs to the current user
    const shelf = await Shelf.findById(id);
    
    if (!shelf || shelf.user.toString() !== req.user.id) {
      return res.status(404).json({message: 'Shelf not found or not authorised'});
    }

    shelf.name = name;
    const updatedShelf = await shelf.save();

    res.status(200).json(updatedShelf);
  } catch(error) {
    res.status(500).json({ message: error.message});
  }
};

const deleteShelf = async (req, res) => {
  const { id } = req.params;

  try {
    //Find the shelf by ID and make sure it belongs to the current user
    const shelf = await Shelf.findById(id);

    if (!Shelf || shelf.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Shelf not found or not authorised'});
    }

    await shelf.remove();

    res.status(200).json({ message: 'Shelf deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

module.exports = {
  createShelf, 
  getShelves, 
  updateShelf, 
  deleteShelf
};




