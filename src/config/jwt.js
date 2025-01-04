const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '24h', // Token expires in 24 hours
  refreshExpiresIn: '7d' // Refresh token expires in 7 days
};

module.exports = JWT_CONFIG;