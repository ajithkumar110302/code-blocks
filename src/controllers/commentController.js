const { validationResult } = require('express-validator');
const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const comment = await Comment.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { post_id } = req.query;
    if (!post_id) {
      return res.status(400).json({ error: 'Blog post ID is required' });
    }

    const comments = await Comment.findAll({
      where: { blogId: post_id },
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getComments
};