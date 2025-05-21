const express = require('express');
const router = express.Router();
const protect = require('../middlewares/AuthMiddleware');
const {
  addBook,
  getBooks,
  getBookById,
} = require('../controllers/BookController');

router.post('/books', protect, addBook); 
router.get('/books', getBooks);          
router.get('/books/:id', getBookById);   

module.exports = router;
