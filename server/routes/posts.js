import express from "express";
import { getPost, createPost, deletePost, getPosts, editPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/post/:id", auth, getPost);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
// router.get("/timeline/all", getTimeline);
router.get("/", auth, getPosts);
router.put("/:id", auth, editPost);

export default router;
