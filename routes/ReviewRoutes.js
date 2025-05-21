const express = require('express');
const router = express.Router();
const protect = require('../middlewares/AuthMiddleware');
const {
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/ReviewController');

router.post('/books/:id/reviews', protect, addReview);     
router.put('/reviews/:id', protect, updateReview);         
router.delete('/reviews/:id', protect, deleteReview);      

module.exports = router;
