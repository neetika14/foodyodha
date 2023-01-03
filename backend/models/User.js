import mongoose from 'mongoose';
import validator from 'validator';
//import crypto from 'crypto';

const UserSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true, "Enter your EmailID"],
        unique: true,
        validate: [validator.isEmail, "Enter a valid Email"]
    },
    password:{
        type: String,
        required: [true, "Enter your Password"],
        minLength: [6, "Password should be greater than 6 characters"]
    },
    isAdmin:{
        type: Boolean,                    //while testing.. yea attribute default to false le raha hai but even true type karne pe bhi db mea false store ho raha hai ..so ekk baar dekh lena
        default: false
    }
    
}, {timestamps: true}
);




export default mongoose.model("User", UserSchema)