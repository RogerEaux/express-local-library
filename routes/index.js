import { Router } from 'express';

const router = Router();

// GET home page.
router.get('/', function (req, res) {
  res.redirect('/catalog');
});

export default router;
