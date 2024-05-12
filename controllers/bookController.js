import Book from '../models/book.js';
import asyncHandler from 'express-async-handler';

export function index() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
  });
}

export function book_list() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book list');
  });
}

export function book_detail() {
  asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
  });
}

export function book_create_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book create GET');
  });
}

export function book_create_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book create POST');
  });
}

export function book_delete_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
  });
}

export function book_delete_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
  });
}

export function book_update_get() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book update GET');
  });
}

export function book_update_post() {
  asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book update POST');
  });
}
