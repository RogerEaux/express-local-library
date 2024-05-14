import BookInstance from '../models/bookInstance.js';
import Book from '../models/book.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

export const bookInstanceList = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate('book').exec();

  res.render('bookInstance/bookInstanceList', {
    title: 'Book Instance List',
    bookinstance_list: allBookInstances,
  });
});

export const bookInstanceDetail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate('book')
    .exec();

  if (bookInstance === null) {
    const err = new Error('Book Instance not found');
    err.status = 404;
    return next(err);
  }

  res.render('bookInstance/bookInstanceDetail', {
    title: 'Book Instance',
    bookinstance: bookInstance,
  });
});

export const bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

  res.render('bookInstance/bookInstanceForm', {
    title: 'Create Book Instance',
    book_list: allBooks,
  });
});

export const bookInstanceCreatePost = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

      res.render('bookInstance/bookInstanceForm', {
        title: 'Create Book Instance',
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });

      return;
    }

    await bookInstance.save();
    res.redirect(bookInstance.url);
  }),
];

export const bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate('book')
    .exec();

  if (!bookInstance) {
    res.redirect('/catalog/bookinstances');
  }

  res.render('bookInstance/bookInstanceDelete', {
    title: 'Delete Book Instance',
    bookinstance: bookInstance,
  });
});

export const bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id).exec();

  await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
  res.redirect('/catalog/bookinstances');
});

export const bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
  const [bookInstance, allBooks] = await Promise.all([
    BookInstance.findById(req.params.id).exec(),
    Book.find({}, 'title').sort({ title: 1 }).exec(),
  ]);

  if (!bookInstance) {
    const err = new Error('Book Instance not found');
    err.status = 404;
    return next(err);
  }

  res.render('bookInstance/bookInstanceForm', {
    title: 'Update Book Instance',
    bookinstance: bookInstance,
    book_list: allBooks,
  });
});

export const bookInstanceUpdatePost = [
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('status').escape(),
  body('due_back', 'Invalid date')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });
    s;
    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, 'title').exec();

      res.render('bookInstance/bookInstanceForm', {
        title: 'Update Book Instance',
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });

      return;
    }

    await BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {});
    res.redirect(bookInstance.url);
  }),
];
