// Router for the authentication procedures (register, login, etc.)

import {Router} from 'express';
import { register,login } from '../controllers/auth.controller.js';

const router = Router();

router.post("/register", register)
router.post("/login", login)




export default router;