import express from 'express'
import {googleLogin} from '../controllers/auth.controller.js'
import protectedRoutes from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/googleLogin', googleLogin);
router.get('/me',protectedRoutes, (req, res) => {res.status(200).json({user: req.user})});


export default router