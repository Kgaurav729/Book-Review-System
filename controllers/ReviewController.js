const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;
  const userId = req.user._id;

  try {
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = await Review.create({ book: bookId, user: userId, rating, comment });

    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error adding review' });
  }
};

exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const reviewId = req.params.id;
  const userId = req.user._id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.user.equals(userId)) {
      return res.status(403).json({ message: 'Not allowed to update this review' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review' });
  }
};


exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user._id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.user.equals(userId)) {
      return res.status(403).json({ message: 'Not allowed to delete this review' });
    }

    await review.deleteOne();

    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};
