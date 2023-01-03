import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import donateRouter from "./routes/donate.js";
//import venueRouter from "./routes/venue.js";
import { createError } from "./utils/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB connected")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
});


//middleware

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/donate", donateRouter);
//app.use("/api/venue", venueRouter);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500 ;
    const errorMessage = err.message || "Something went wrong" ;

    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});




app.listen(process.env.PORT , ()=>{
    connect()
    console.log("Listening PORT...")
})