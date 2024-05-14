import Book from '../models/book.js';
import Author from '../models/author.js';
import BookInstance from '../models/bookInstance.js';
import Genre from '../models/genre.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

export const index = asyncHandler(async (req, res, next) => {
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: 'Available' }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'Local Library Home',
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

export const bookList = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title author')
    .sort({ title: 1 })
    .populate('author')
    .exec();

  res.render('bookList', { title: 'Book List', book_list: allBooks });
});

export const bookDetail = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  if (!book) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }

  res.render('bookDetail', {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  });
});

export const bookCreateGet = asyncHandler(async (req, res, next) => {
  const [allAuthors, allGenres] = await Promise.all([
    Author.find().sort({ family_name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  res.render('bookForm', {
    title: 'Create Book',
    authors: allAuthors,
    genres: allGenres,
  });
});

export const bookCreatePost = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    }
    next();
  },

  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        Author.find().sort({ family_name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of allGenres) {
        if (book.genre.includes(genre._id)) {
          genre.checked = 'true';
        }
      }
      res.render('bookForm', {
        title: 'Create Book',
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array(),
      });

      return;
    }

    await book.save();
    res.redirect(book.url);
  }),
];

export const bookDeleteGet = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  if (!book) {
    res.redirect('/catalog/books');
  }

  res.render('bookDelete', {
    title: 'Delete Author',
    book: book,
    book_instances: bookInstances,
  });
});

export const bookDeletePost = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  if (bookInstances.length > 0) {
    res.render('bookDelete', {
      title: 'Delete Book',
      book: book,
      book_instances: bookInstances,
    });

    return;
  }

  await Book.findByIdAndDelete(req.body.bookid);
  res.redirect('/catalog/books');
});

export const bookUpdateGet = asyncHandler(async (req, res, next) => {
  const [book, allAuthors, allGenres] = await Promise.all([
    Book.findById(req.params.id).populate('author').exec(),
    Author.find().sort({ family_name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  if (book === null) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }

  allGenres.forEach((genre) => {
    if (book.genre.includes(genre._id)) genre.checked = 'true';
  });

  res.render('bookForm', {
    title: 'Update Book',
    authors: allAuthors,
    genres: allGenres,
    book: book,
  });
});

export const bookUpdatePost = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    }
    next();
  },

  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        Author.find().sort({ family_name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of allGenres) {
        if (book.genre.indexOf(genre._id) > -1) {
          genre.checked = 'true';
        }
      }

      res.render('bookForm', {
        title: 'Update Book',
        authors: allAuthors,
        genres: allGenres,
        book: book,
        errors: errors.array(),
      });

      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {});
    res.redirect(updatedBook.url);
  }),
];
