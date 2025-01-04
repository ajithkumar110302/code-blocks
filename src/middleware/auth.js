const { verifyToken } = require('../utils/tokenUtils');
const { errorResponse } = require('../utils/responseHandler');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json(errorResponse('Authentication required'));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json(errorResponse('Token expired or invalid'));
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(errorResponse('Invalid token'));
  }
};

module.exports = auth;