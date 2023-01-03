import Donate from "../models/donate.js";
//import User from "../models/User.js";
import ApiFeatures from "../utils/apifeatures.js";
import { createError } from "../utils/error.js";


//Create donate request
export const createDonateRequest = async (req,res,next)=>{
    const {
        eventDesc,
        date,
        location,
        PhoneNo1,
        PhoneNo2,
        additionalComment,
        delivery,
        expectedFoodAmount,
        status
    }= req.body;

    //console.log(req.user.id);
    try{
        const donateRequest = await Donate.create({
            eventDesc,
            date,
            location,
            PhoneNo1,
            PhoneNo2,
            additionalComment,
            delivery,
            expectedFoodAmount,
            status,
            requestedAt: Date.now(),
            user: req.user.id,
        });
    
        res.status(200).json(donateRequest)
    } catch(err){
        next(err);
    } 
};

//Update donate request status --admin
export const updateDonateRequest = async (req,res,next)=>{
    try{
        //const updateEvent = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        const updateDonateRequest = await Donate.findById(req.params.id);

        if(!updateDonateRequest){
            return next(createError(404, "Request not found with this Id"))
        };

        if(updateDonateRequest.status=== "Verified"){
            return next(createError(400, "You have already verified this event"))
        };
        updateDonateRequest.status = req.body.status;

        if(req.body.status === "Verified"){
            updateDonateRequest.verifiedAt = Date.now();
        };

        await updateDonateRequest.save({ validateBeforeSave: false});
        res.status(200).json(updateDonateRequest)
    } catch(err){
        next(err);
    }
};

//Get Single Donate Request
export const getSingleDonateRequest = async (req,res,next)=>{
    try{
        const donateRequest = await Donate.findById(req.params.id).populate("user","email");
        if(!donateRequest){
            return next(createError(404, "Request not found with this Id"));
        }
        res.status(200).json(donateRequest);
    } catch(err){
        next(err);
    }
};

//Get logged in user donateRequests
export const myRequests = async (req,res,next)=>{
    //console.log(req.user.id);
    const apiFeatures = new ApiFeatures(Donate.find({ user: req.user.id }),req.query).filter();
    try{
        const donateRequests = await apiFeatures.query;
        
        res.status(200).json(donateRequests);
    } catch(err){
        next(err);
    }
};

//GetAll Donate Requests
export const getallDonateRequests = async (req,res,next)=>{
    const apiFeatures = new ApiFeatures(Donate.find(),req.query).filter();
    try{
        const donateRequest = await apiFeatures.query;
        res.status(200).json(donateRequest);
    } catch(err){
        next(err);
    }
};