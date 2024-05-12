import BookInstance from '../models/bookInstance.js';
import asyncHandler from 'express-async-handler';

export function bookinstance_list() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance list');
  });
}

export function bookinstance_detail() {
  asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
  });
}

export function bookinstance_create_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
  });
}

export function bookinstance_create_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
  });
}

export function bookinstance_delete_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
  });
}

export function bookinstance_delete_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
  });
}

export function bookinstance_update_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
  });
}

export function bookinstance_update_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
  });
}
