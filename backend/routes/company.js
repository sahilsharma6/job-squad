import express from 'express';
import { signIn, signOut, signUp } from '../controllers/companyController.js';
const CompanyRoutes=express.Router();

CompanyRoutes.post('/signup',signUp);
CompanyRoutes.post('/signin',signIn);
CompanyRoutes.get('/logout',signOut);


export default CompanyRoutes