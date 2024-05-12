import Genre from '../models/genre.js';
import asyncHandler from 'express-async-handler';

export const genre_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Genre list');
});

export const genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
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
