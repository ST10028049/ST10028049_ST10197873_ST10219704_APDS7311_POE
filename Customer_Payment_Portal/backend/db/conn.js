import mongoose from "mongoose"; 

// Retrieve MongoDB URIs from environment variables
const MONGO_URI = process.env.MONGO_URI; // Local MongoDB URI
const ATLAS_URI = process.env.ATLAS_URI; // MongoDB Atlas URI for cloud database

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the local MongoDB database
        await mongoose.connect(MONGO_URI);
        console.log(`connected ${MONGO_URI}`); 
    } catch (err) {
        console.error(`Failed to connect to ${MONGO_URI}: ${err.message}}`);
        console.log(`Trying to connect to ${ATLAS_URI}`); 
        
        try {
            // Attempt to connect to the MongoDB Atlas cloud database
            await mongoose.connect(ATLAS_URI);
            console.log(`connected ${ATLAS_URI}`); 
        } catch (error) {
            console.error('Failed to connect to MONGODB', err);
            process.exit(1); 
        }
    }
}

export default connectDB; 
