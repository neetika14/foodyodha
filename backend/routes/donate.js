import express from "express";
import { createDonateRequest , updateDonateRequest , getSingleDonateRequest , getallDonateRequests, myRequests } from "../controllers/donate.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";        

const router = express.Router();

//CREATE
router.post("/", verifyUser, createDonateRequest);

//UPADATE Donate Request STATUS --by admin
router.put("/:id", verifyAdmin, updateDonateRequest);

//DECLINE EVENT --by admin
//router.delete("/:id", verifyAdmin, deleteEvent );

//GET LOGGED IN USER Donate Requests
router.get("/find/me", verifyUser, myRequests);

//GET
router.get("/find/:id", verifyUser, verifyAdmin, getSingleDonateRequest);


//GETALL
router.get("/", getallDonateRequests);



export default router