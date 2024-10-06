import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
    username: { //displays ther person who tried to login
        type: String,
        required: true,
        unique: true,
        immutable: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/,"Only alphanumeric characters and underscores"]
    },
    ipAddress:{  //retreives the ipAddress of the person
        type: String,
        required: true,
        immutable: true
    },
    successfulLogin:{ //displays if the person was able to login(true or false response)
        type: Boolean,
        required: true,
        immutable: true
    },
    timestamp: { //displays the time the user try to login
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("LoginAttempt",loginAttemptSchema);