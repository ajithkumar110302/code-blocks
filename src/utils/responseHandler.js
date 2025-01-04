const successResponse = (data, message = 'Success') => ({
  success: true,
  message,
  data
});

const errorResponse = (message = 'Error', errors = null) => ({
  success: false,
  message,
  errors
});

module.exports = {
  successResponse,
  errorResponse
};