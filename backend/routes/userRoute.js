import express from 'express';
import { getUser, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser)
userRoute.get('/data', protect ,getUser);

export default userRoute;