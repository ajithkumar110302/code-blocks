const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { createComment, getComments } = require('../controllers/commentController');

const router = express.Router();

router.post('/', auth, [
  body('content').trim().isLength({ min: 1 }),
  body('blogId').isUUID()
], createComment);

router.get('/', getComments);

module.exports = router;