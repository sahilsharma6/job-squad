import express from 'express';
import { SignIn, SignUp ,LogOut} from '../controllers/UserAuth.js';
const UserRoutes=express.Router();

UserRoutes.post('/signup',SignUp)
UserRoutes.post('/signin',SignIn)
UserRoutes.get('/logout',LogOut)
export default UserRoutes