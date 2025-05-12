import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js'
import { post, getPosts, editPost } from '../controllers/post.controller.js';

const router = Router();

router.post("/post", validateToken, post)
router.get("/getPosts", validateToken, getPosts) 
router.patch("/editPost", validateToken, editPost)

export default router;