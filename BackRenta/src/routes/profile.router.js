import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js'
import { getProfile, editProfile } from '../controllers/profile.controller.js';

const router = Router();

router.get("/getProfile/:id", validateToken, getProfile) // not in usage by the moment
router.patch("/editProfile", validateToken, editProfile)

export default router;
