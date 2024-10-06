// Import the LoginAttempt model to interact with the database
import LoginAttempt from "../models/LoginAttempt.js";

const loginAttemptLogger = async (req, res, next) => {
      const originalJson = res.json;

    // Override the res.json method to include login attempt logging
    res.json = function(data) {
        const username = req.body.username;

        // Get the IP address of the requester
        const ipAddress = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== "Invalid credentials";

        LoginAttempt.create({ username, ipAddress, successfulLogin })
        .catch(err => console.error("Error logging the login attempt:", err)); 

        // Call the original res.json method to send the response
        originalJson.call(this, data);
    };

    // Call the next middleware in the stack
    next();
};

export default loginAttemptLogger;
