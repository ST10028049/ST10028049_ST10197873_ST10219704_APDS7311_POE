import mongoose from "mongoose";

// Define the user schema for the User model
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,  
        required: true,
        trim: true,
        match: [/^\d{9,11}$/, "Account number must be between 9 and 11 digits"] // Regex to validate account number format (9 to 11 digits)
    },
    IDnumber: {
        type: String,
        required: true,
        match: [/^\d{13}$/,"Invalid ID number. Must contain 13 digits only"] // Regex to validate ID number format (exactly 13 digits)
    },
    email: {
        type: String,  
        required: true,
        trim: true,
        unique: true,  
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"] // Regex to validate email format, (Allan.2019)
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/,"Only alphanumeric characters and underscores"] // Regex to validate username format, (Gumbo.2009).
    },
    password: {
        type: String,
        unique: true,
        required: true,
    }
});

export default mongoose.model("User",userSchema);

//Reference List
/*Allan.2019.How to validate email by whitelist domain regex,8 January 2019.[Online].Available at:https://stackoverflow.com/questions/54087566/how-to-validate-email-by-whitelist-domain-regex .[Accessed 3 October 2024]*/
/*aixecador.2020. E11000 duplicate key error index in mongodb mongoose, 10 January 2020.[Online].Available at: https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose .[Accessed 4 October 2024]*/
/*Gumbo.2009.Validate username as alphanumeric with underscores,25 August 2009.[Online]. Available at:https://stackoverflow.com/questions/1330693/validate-username-as-alphanumeric-with-underscores .[Accessed 3 October 2024] */