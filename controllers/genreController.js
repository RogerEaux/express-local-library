import Genre from '../models/genre.js';
import asyncHandler from 'express-async-handler';

export function genre_list() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre list');
  });
}

export function genre_detail() {
  asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
  });
}

export function genre_create_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create GET');
  });
}

export function genre_create_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create POST');
  });
}

export function genre_delete_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete GET');
  });
}

export function genre_delete_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete POST');
  });
}

export function genre_update_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update GET');
  });
}

export function genre_update_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update POST');
  });
}
