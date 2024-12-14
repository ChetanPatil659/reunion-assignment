import jwt from 'jsonwebtoken';

export const SECRET_KEY = process.env.SECRET_KEY; // Replace with a secure key from environment variables

// Generate a JWT token
export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const generateRefreshToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify a JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
