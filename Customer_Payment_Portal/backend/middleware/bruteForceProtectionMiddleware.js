// Import necessary libraries
import ExpressBrute from "express-brute"; 
import MongooseStore from "express-brute-mongoose"; 
import mongoose from "mongoose"; 

// Define the schema for storing brute force attempt data
const bruteForceSchema = new mongoose.Schema({
    _id: String, 
    data: {
        count: Number, // Count of failed attempts
        lastRequest: Date, // Timestamp of the last request
        firstRequest: Date // Timestamp of the first request
    },
    expires: { type: Date, index: { expires: '1d' }} // Expiration time for the record (1 day)
});

const BruteForceModel = mongoose.model("bruteforce", bruteForceSchema);

const store = new MongooseStore(BruteForceModel);

const bruteForce = new ExpressBrute(store, {
    freeRetries: 2, // Number of allowed retries before blocking the user
    minWait: 1 * 60 * 1000, // Minimum wait time (1 minute) before the next request can be attempted
    maxWait: 2 * 60 * 1000, // Maximum wait time (2 minutes) before the next request can be attempted
    failCallback: function (req, res, next, nextValidRequestDate) {
        // Callback function to handle failed attempts
        res.status(429).json({
            message: 'Too many failed attempts. Please try again later.', 
            nextValidRequestDate // Timestamp when the user can attempt again
        });
    }
});

export default bruteForce;
