import express from "express";
import { userReg, Login } from "../controllers/auth.js";
const router = express.Router();

//REGISTER
router.post("/register", userReg);
router.post("/login", Login);

export default router;
