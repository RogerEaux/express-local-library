import Author from '../models/author.js';
import asyncHandler from 'express-async-handler';

export function author_list() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author list');
  });
}

export function author_detail() {
  asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  });
}

export function author_create_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author create GET');
  });
}

export function author_create_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author create POST');
  });
}

export function author_delete_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
  });
}

export function author_delete_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
  });
}

export function author_update_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update GET');
  });
}

export function author_update_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update POST');
  });
}
