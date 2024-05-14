import Author from '../models/author.js';
import Book from '../models/book.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

export const authorList = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render('authorList', {
    title: 'Author List',
    author_list: allAuthors,
  });
});

export const authorDetail = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, 'title summary').exec(),
  ]);

  if (author === null) {
    const err = new Error('Author not found');
    err.status = 404;
    return next(err);
  }

  res.render('authorDetail', {
    title: 'Author Detail',
    author: author,
    author_books: authorBooks,
  });
});

export const authorCreateGet = asyncHandler(async (req, res, next) => {
  res.render('authorForm', { title: 'Create Author' });
});

export const authorCreatePost = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('date_of_death', 'Invalid date of death')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render('author_form', {
        title: 'Create Author',
        author: author,
        errors: errors.array(),
      });

      return;
    }

    await author.save();
    res.redirect(author.url);
  }),
];

export const authorDeleteGet = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, 'title summary').exec(),
  ]);

  if (author === null) {
    // No results.
    res.redirect('/catalog/authors');
  }

  res.render('authorDelete', {
    title: 'Delete Author',
    author: author,
    author_books: authorBooks,
  });
});

export const authorDeletePost = asyncHandler(async (req, res, next) => {
  const [author, authorBooks] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, 'title summary').exec(),
  ]);

  if (authorBooks.length > 0) {
    res.render('authorDelete', {
      title: 'Delete Author',
      author: author,
      author_books: authorBooks,
    });

    return;
  }

  await Author.findByIdAndDelete(req.body.authorid);
  res.redirect('/catalog/authors');
});

export const authorUpdateGet = asyncHandler(async (req, res, next) => {
  const author = await Author.findById(req.params.id).exec();

  if (!author) {
    const err = new Error('Author not found');
    err.status = 404;
    return next(err);
  }

  res.render('authorForm', {
    title: 'Update Author',
    author: author,
  });
});

export const authorUpdatePost = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('date_of_death', 'Invalid date of death')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('authorForm', {
        title: 'Update Author',
        author: author,
        errors: errors.array(),
      });

      return;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      author,
      {}
    );
    res.redirect(updatedAuthor.url);
  }),
];
