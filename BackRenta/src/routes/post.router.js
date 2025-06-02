import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js'
import { post, getPosts, editPost, getUserPosts, deletePost, searchPosts } from '../controllers/post.controller.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.post("/post", upload.single("photo"), validateToken, post)
router.get("/getPosts", validateToken, getPosts) 
router.patch("/editPost", validateToken, editPost)
router.get("/getUserPosts/:id", validateToken, getUserPosts)
router.delete("/deletePost/:id", validateToken, deletePost)
router.post("/searchPosts", validateToken, searchPosts)

export default router;