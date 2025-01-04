const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { register, login, refreshToken, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', [
  body('username').trim().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', login);

router.post('/refresh-token', [
  body('refreshToken').notEmpty()
], refreshToken);

router.get('/:id', auth, getUser);

module.exports = router;