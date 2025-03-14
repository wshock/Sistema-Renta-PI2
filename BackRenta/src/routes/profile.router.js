import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js'
import { getProfile, editProfile } from '../controllers/profile.controller.js';

const router = Router();

router.get("/getProfile/:id", validateToken, getProfile)
router.put("/editProfile/:id", validateToken, editProfile)

export default router;
