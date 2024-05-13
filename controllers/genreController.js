import Genre from '../models/genre.js';
import Book from '../models/book.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

export const genreList = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find({}, 'name').sort({ name: 1 }).exec();

  res.render('genreList', { title: 'Genre List', genre_list: allGenres });
});

export const genreDetail = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, 'title summary').exec(),
  ]);

  if (!genre) {
    const err = new Error('Genre not found');
    err.status = 404;
    return next(err);
  }

  res.render('genreDetail', {
    title: 'Genre Detail',
    genre: genre,
    genre_books: genreBooks,
  });
});

export const genreCreateGet = async (req, res, next) => {
  res.render('genreForm', { title: 'Create Genre' });
};

export const genreCreatePost = [
  body('name', 'Genre name must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render('genreForm', {
        title: 'Create Genre',
        genre: genre,
        errors: errors.array(),
      });

      return;
    }

    const genreExists = await Genre.findOne({ name: req.body.name })
      .collation({ locale: 'en', strength: 2 })
      .exec();

    if (genreExists) {
      res.redirect(genreExists.url);

      return;
    }

    await genre.save();
    res.redirect(genre.url);
  }),
];

export const genreDeleteGet = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, 'title summary').exec(),
  ]);

  if (!genre) {
    res.redirect('/catalog/genres');
  }

  res.render('genreDelete', {
    title: 'Delete Genre',
    genre: genre,
    genre_books: genreBooks,
  });
});

export const genreDeletePost = asyncHandler(async (req, res, next) => {
  const [genre, genreBooks] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, 'title summary').exec(),
  ]);

  if (genreBooks.length > 0) {
    res.render('genreDelete', {
      title: 'Delete Genre',
      genre: genre,
      genre_books: genreBooks,
    });

    return;
  }

  await Genre.findByIdAndDelete(req.body.genreid);
  res.redirect('/catalog/genres');
});

export const genre_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update GET');
});

export const genre_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update POST');
});
