import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bruteForce from '../middleware/bruteForceProtectionMiddleware.js';
import loginAttemptLogger from '../middleware/loginAttemptLogMiddleware.js';
import inappropriateWordsMiddleware from '../middleware/InappropriateWordsMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


//base route
router.get("/",(req,res)=>{
    res.send('Hello auth');
});

//register
router.post('/register', inappropriateWordsMiddleware, async (req, res) =>{
    try{
        const { fullname, accountNumber, IDnumber, username, email, password} = req.body;

        //Check if the username or email already 
        const existingUser = await User.findOne({ $or: [{username}, {email}]})
        if (existingUser) {
            return res.status(400).json({message: "Username or email already exists"})
        }

        //Salting the password, (Chairanya,A.2023)
        const salt = await bcrypt.genSalt(10); // Generates a salt with 10 rounds
        // Hash the alted password
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({ fullname, accountNumber, IDnumber, username, email, password: hashedPassword}); //storing the hashed password
        await newUser.save();

        return res.status(201).json({message: "User created successfully!"})
    }catch(err){
        res.status(500).json({ message: 'Internal Server error', error: err});
    }
});


//login
router.post('/login', bruteForce.prevent, loginAttemptLogger, async (req, res) => {
    try {
      const { username, password, accountNumber} = req.body;
  
      //Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check the password
      const passwordisMatch = await bcrypt.compare(password, user.password);
      if (!passwordisMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

       // Check the account number
    if (accountNumber !== accountNumber) {
        return res.status(400).json({ message: "Invalid Account number" });
      }

      //Create a JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });

    } catch (err) {
      res.status(500).json({ message: 'Internal Server error', error: err.message});
    }
  });


export default router

//Reference List
/*Chaitanya,A. 2023.Salting and Hashing Passwords with bcrypt.js: A Comprehensive Guide, 20 June 2023. [Online]. Available at:https://medium.com/@arunchaitanya/salting-and-hashing-passwords-with-bcrypt-js-a-comprehensive-guide-f5e31de3c40c .[Accessed 4 October 2024]*/
/*model and hashing password Ecommerce Mern app | Mern stack project.2023. YouTube video added by Techinfo YT.[Online].Available at: https://www.youtube.com/watch?v=vhg9IhwdVVM&list=PLuHGmgpyHfRzhGkSUfY0vpi67X64g0mXB&index=5 .[Accessed 4 October 2024]*/