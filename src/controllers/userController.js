const { validationResult } = require('express-validator');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { generateTokens } = require('../utils/tokenUtils');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse('Validation error', errors.array()));
    }

    const user = await User.create(req.body);
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json(successResponse({
      user: userData,
      accessToken,
      refreshToken
    }, 'User registered successfully'));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    res.json(successResponse({
      user: userData,
      accessToken,
      refreshToken
    }, 'Login successful'));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decoded = verifyToken(refreshToken);

    if (!decoded || decoded.type !== 'refresh') {
      return res.status(401).json(errorResponse('Invalid refresh token'));
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.id);

    res.json(successResponse({
      accessToken,
      refreshToken: newRefreshToken
    }, 'Tokens refreshed successfully'));
  } catch (error) {
    res.status(401).json(errorResponse('Token refresh failed'));
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }
    res.json(successResponse({ user }));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  getUser
};