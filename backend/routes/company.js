import express from 'express';
import { LogOut, SignIn, SignUp } from '../controllers/companyAuth.js';
const Companyroutes=express.Router();

Companyroutes.post('/signup',SignUp)
Companyroutes.post('/signin',SignIn)
Companyroutes.get('/logout',LogOut)
export default Companyroutes