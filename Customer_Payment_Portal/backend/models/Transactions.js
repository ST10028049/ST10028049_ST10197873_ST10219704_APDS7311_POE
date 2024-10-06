import mongoose from "mongoose";

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    accountHolderName: {
        type: String,
        required: true,
    },
      payerAccountNumber: {
        type: String,  
        required: true,
        trim: true,
        match: [/^\d{9,11}$/, "Account number must be between 9 and 11 digits"] // Validate with regex
    },
    bankName: {
        type: String,
        required: true,
    },
    bankAddress: {
        type: String,
        required: true,
    },
    swiftCode: {
        type: String,
        required: true,
    },
    iban: {
        type: String,
        required: false,  
    },
    transactionAmount: {
        type: Number,
        required: true,
        min: [0, 'Transaction amount cannot be negative'], // Ensure the amount is not negative
    },
    currency: {
        type: String,
        required: true,
        enum: ['ZAR', 'USD', 'EUR', 'GBP'],
        default: 'ZAR'
    },
    provider: {
        type: String,
        required: true,
        enum: ['SWIFT', 'PayPal', 'Stripe', 'Sqaure', 'Apple Pay'],
        default: 'SWIFT'
    },
    transactionDate: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    transactionStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed', 'Cancelled'],
        default: 'Pending'
    }
});

export default mongoose.model("Transactions",transactionSchema);
