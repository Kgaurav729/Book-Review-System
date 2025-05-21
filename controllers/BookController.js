const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await Book.create({ title, author, genre });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book' });
  }
};


exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = genre;

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(id).populate({
      path: 'reviews',
      options: {
        skip: (page - 1) * limit,
        limit: parseInt(limit),
      },
      populate: { path: 'user', select: 'username' },
    });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    const allReviews = await Review.find({ book: id });
    const averageRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length || 0;

    res.json({
      book,
      averageRating: averageRating.toFixed(2),
      totalReviews: allReviews.length,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book' });
  }
};
