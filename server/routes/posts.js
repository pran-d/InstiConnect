import express from "express";
import { getPost, createPost, deletePost, getTimeline, getPosts } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/post/:id", getPost);
router.post("/", auth, createPost);
router.delete("/:id", deletePost);
router.get("/timeline/all", getTimeline);
router.get("/", auth, getPosts);

export default router;
