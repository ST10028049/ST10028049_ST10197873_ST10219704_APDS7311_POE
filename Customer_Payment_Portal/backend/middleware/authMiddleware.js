//this folder checks the JSONWebtoken against the user who is trying to login and either grant access or deny access
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => { //checks the function and then passes it to the "next" funtion
    console.log('Request Headers:', req.headers);

    const authHeader = req.header('Authorization'); //represents the Authorization header
    console.log('Authorization Header:', authHeader);

    if (!authHeader) { //if there is no Authorization header then it will deny access
        return res.status(401).json({ message: 'There is no authorization header, access is denied' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ message: 'The Authorization header format is incorrect, it must be "Bearer [Token]"' });
    }
    // Extract the token from the second part of the header
     const token = parts[1];
     console.log('Token:', token);

 // Check if a token was provided
  if (!token) { 
     return res.status(401).json({ message: 'There is no token provided, authorization is denied' });
        }

 try {
     // Verify the token using the secret key
     const decoded = jwt.verify(token, JWT_SECRET);
     console.log('Decoded Token:', decoded);
     // Attach the decoded token data to the request object for access in subsequent middleware or routes
     req.user = decoded;
     next();      // Call the next middleware function in the stack
 } catch (err) {

     // Log any errors that occur during token verification
     console.error('Token Verification Error:', err);
     if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token, access has been denied' });
     } else if (err.name === 'TokenExpiredError') {
         return res.status(401).json({ message: 'Token has expired, access is denied' });
     }
     res.status(500).json({ message: 'Server error during authentication', error: err });
 }
};

export default authMiddleware;