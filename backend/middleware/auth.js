const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    let errorMessage = 'Invalid token';
    let statusCode = 403;

    // Handle specific JWT errors for better responses
    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
      statusCode = 401;
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Malformed token';
    }

    res.status(statusCode).json({ message: errorMessage, error: error.message });
  }
};
