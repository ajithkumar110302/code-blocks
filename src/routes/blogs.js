const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { createBlog, getBlogs, getBlog } = require('../controllers/blogController');

const router = express.Router();

router.post('/', auth, [
  body('title').trim().isLength({ min: 1 }),
  body('content').trim().isLength({ min: 1 })
], createBlog);

router.get('/', getBlogs);

router.get('/:id', getBlog);

module.exports = router;