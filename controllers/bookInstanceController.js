import BookInstance from '../models/bookInstance.js';
import asyncHandler from 'express-async-handler';

export const bookInstanceList = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate('book').exec();

  res.render('bookInstanceList', {
    title: 'Book Instance List',
    bookinstance_list: allBookInstances,
  });
});

export const bookinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

export const bookinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
});

export const bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
});

export const bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
});

export const bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
});

export const bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
});

export const bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
});
