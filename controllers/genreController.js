import Genre from '../models/genre.js';
import Book from '../models/book.js';
import asyncHandler from 'express-async-handler';

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

export const genre_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre create GET');
});

export const genre_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre create POST');
});

export const genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete GET');
});

export const genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre delete POST');
});

export const genre_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update GET');
});

export const genre_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre update POST');
});
