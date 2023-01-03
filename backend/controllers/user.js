import User from "../models/User.js";
import bcrypt from "bcryptjs";
//import crypto from "crypto";
import { createError } from "../utils/error.js";

import jwt from "jsonwebtoken";
//import { sendEmail } from "../utils/sendEmail.js";
//import { sendToken } from "../utils/verifyToken.js";


//REGISTER
export const register = async (req,res,next)=>{
    try{
        const salt= bcrypt.genSaltSync(7);
        const hash= bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash
        })
        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err);
    }
}

//LOGIN
export const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) 
            return next(createError(400, "Wrong username or password!"));
        
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        
        
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ details:{...otherDetails}, isAdmin });
    }catch(err){
        next(err);
    }
};

//UPDATE USER
export const updateUser = async (req,res,next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch(err){
        next(err);
    }
};

//DELETE USER
export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted")
    } catch(err){
        next(err);
    }
};

//GET USER
export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch(err){
        next(err);
    }
};

//GETALL USER
export const getallUser = async (req,res,next)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    } catch(err){
        next(err);
    }
};
