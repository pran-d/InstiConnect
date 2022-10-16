import express from "express";
const router = express.Router();
import { getUsers, updateUser, deleteUser, getUser, connectUser, acceptUser } from "../controllers/users.js";

//update user
router.put("/:id", updateUser);
//delete user
router.delete("/:id", deleteUser);
//get a user
router.get("/", getUsers);
router.get("/user/:username", getUser);
router.put("/:id/connect", connectUser);
router.put("/:id/accept", acceptUser);

//follow user
//unfollow user

export default router;
