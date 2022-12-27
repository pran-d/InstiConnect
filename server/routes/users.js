import express from "express";
const router = express.Router();
import { getUsers, updateUser, deleteUser, getUser, connectUser, acceptUser } from "../controllers/users.js";
import auth from "../middleware/auth.js";

//update user
router.put("/:id", auth, updateUser);
//delete user
router.delete("/:id", auth, deleteUser);
//get a user
router.get("/", getUsers);
router.get("/user/:username", auth, getUser);
router.put("/:id/connect", connectUser);
router.put("/:id/accept", acceptUser);

//follow user
//unfollow user

export default router;
