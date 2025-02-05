import express from 'express';
import { addEducation, addExperience, deleteAddress, deleteEducation, deleteExperience, getAddress, getEducation, getExperience, getResume, googleSignIn, request, setAddress, signIn, signOut, signUp, updateAddress, updateEducation, updateExperience, uploadResume } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import ApplicationRouter from './application.js';
import uploadResumeMiddleware from '../middleware/uploadResumeMiddleware.js';
const UserRoutes=express.Router();

UserRoutes.post('/signup',signUp)
UserRoutes.post('/signin',signIn)
UserRoutes.get('/logout',signOut)
UserRoutes.get('/googlelogin',googleSignIn);
UserRoutes.post('/request',request);

// address routes
UserRoutes.post('/setaddress',isAuthenticated,setAddress);
UserRoutes.get('/getaddress',isAuthenticated,getAddress);
UserRoutes.put('/updateaddress',isAuthenticated,updateAddress);
UserRoutes.delete('/deleteaddress',isAuthenticated,deleteAddress);

// experience routes

UserRoutes.post('/setexperience',isAuthenticated,addExperience);
UserRoutes.get('/getexperience',isAuthenticated,getExperience);
UserRoutes.put('/updateexperience/:id',isAuthenticated,updateExperience); // id is experience id
UserRoutes.delete('/deleteexperience/:id',isAuthenticated,deleteExperience); // id is experience id

// education routes

UserRoutes.post('/seteducation',isAuthenticated,addEducation);
UserRoutes.get('/geteducation',isAuthenticated,getEducation);
UserRoutes.put('/updateeducation/:id',isAuthenticated,updateEducation); // id is education id
UserRoutes.delete('/deleteeducation/:id',isAuthenticated,deleteEducation); // id is education id
UserRoutes.post('/resume',isAuthenticated,uploadResumeMiddleware,uploadResume);
UserRoutes.get('/resume/:id',isAuthenticated,getResume); // id is user id
//all  jobs
UserRoutes.use('/job-application',ApplicationRouter);

export default UserRoutes