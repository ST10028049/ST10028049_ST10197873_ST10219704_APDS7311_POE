import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/conn.js';
import authRoutes from './Routes/auth.js';
import transactionRoutes from './Routes/transaction.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(helmet()); // Add extra layer of security to your API
app.use(morgan('combined')); // Log HTTP requests
app.use(cors({
    origin: 'https://localhost:3000',  // Allow requests from React dev server
    credentials: true
 }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// SSL Certificate and key setup
const options = {
   key: fs.readFileSync('keys/privatekey.pem'),
   cert: fs.readFileSync('keys/certificate.pem')
};

// Run HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Secure server is running on port ${PORT}`);
});


