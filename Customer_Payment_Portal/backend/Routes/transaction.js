import express from "express";
import Transactions from "../models/Transactions.js";
import authMiddleware  from "../middleware/authMiddleware.js";

const router = express.Router();

//get all transactions
router.get('/', authMiddleware, async (req, res) => {
    try {
      const transactions = await Transactions.find();
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server error', error: err });
    }
  });

//Create/make transactions
router.post("/", authMiddleware, async (req, res) => {
    const {accountHolderName, bankName, bankAddress, swiftCode, iban,transactionAmount,currency,provider, payerAccountNumber} = req.body;
  
    //validate request body
    if (!transactionAmount || !currency|| !provider|| !swiftCode) {
      return res.status(400).json({ message: "Please fill in all the required fields" }); 
    }
  
    //Create a new transaction
    const newTransaction = new Transactions({accountHolderName, bankName, bankAddress, swiftCode, iban,transactionAmount,currency,provider,payerAccountNumber});
  
    try {
      const payment = await newTransaction.save();
      res.status(201).json({message: 'Successful Transaction', payment});
  
    } catch (err) {
      console.error('Error making transaction', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  
//get transactions by id
router.get('/:id', authMiddleware, async (req, res) => { //passes the id into the url
  try {
    const transaction = await Transactions.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    console.error('Error getting the transaction', err);
    res.status(500).json({ message: 'Internal Server error', error: err });
  }
});

export default router;
