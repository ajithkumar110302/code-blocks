const { validationResult } = require('express-validator');
const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blog = await Blog.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const blogs = await Blog.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      blogs: blogs.rows,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog
};