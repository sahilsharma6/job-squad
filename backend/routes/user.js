import express from 'express';
import { googleSignIn, request, SignIn, signOut, SignUp } from '../controllers/userController.js';

const UserRoutes=express.Router();

UserRoutes.post('/signup',SignUp)
UserRoutes.post('/signin',SignIn)
UserRoutes.get('/logout',signOut)
UserRoutes.get('/googlelogin',googleSignIn);
UserRoutes.post('/request',request);

export default UserRoutes