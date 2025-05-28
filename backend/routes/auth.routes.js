import express from 'express'
import {googleLogin, login, onboard} from '../controllers/auth.controller.js'
import protectedRoutes from '../middleware/authMiddleware.js';
const router = express.Router();

// Auth Routes
router.post('/googleLogin', googleLogin);
router.post('/login', login);
router.post('/onboard',protectedRoutes ,onboard);

router.get('/me',protectedRoutes, (req, res) => {res.status(200).json({user: req.user})});


export default router