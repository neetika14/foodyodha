import express from "express";
import { register, login, updateUser, deleteUser, getUser, getallUser } from "../controllers/user.js";
import { verifyUser } from "../utils/verifyToken.js";
//import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

//REGISTER
router.post("/register", register,);

//LOGIN 
router.post("/login", login);

//UPADATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser );

//GET
router.get("/i", verifyUser, getUser);

//GETALL
router.get("/", getallUser);


export default router