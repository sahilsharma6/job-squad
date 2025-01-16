import express from 'express';
import { SignIn, SignUp ,LogOut} from '../controllers/UserAuth.js';
const Userroutes=express.Router();

Userroutes.post('/signup',SignUp)
Userroutes.post('/signin',SignIn)
Userroutes.get('/logout',LogOut)
export default Userroutes