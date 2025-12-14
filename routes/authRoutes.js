import express from "express";
import { logInUser, registerUser } from "../controllers/user.Controller.js";

const router = express.Router();

//Register User Router
router.post('/register', registerUser);

//Login User Router
router.post('/login', logInUser);

export default router;