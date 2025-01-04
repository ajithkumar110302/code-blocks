const jwt = require('jsonwebtoken');
const JWT_CONFIG = require('../config/jwt');

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    JWT_CONFIG.secret,
    { expiresIn: JWT_CONFIG.expiresIn }
  );

  const refreshToken = jwt.sign(
    { id: userId, type: 'refresh' },
    JWT_CONFIG.secret,
    { expiresIn: JWT_CONFIG.refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_CONFIG.secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  verifyToken
};