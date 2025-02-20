import express from 'express';
import { addEducation, addExperience, deleteAddress, deleteEducation, deleteExperience, followCompany, followedCompanies, getAddress, getdata, getEducation, getExperience, getjobPreference, getResume, getSavedJobs, googleSignIn, request, saveJob, setAddress, SetjobPreference, signIn, signOut, signUp, updateAddress, updateEducation, updateExperience, updateProfile, uploadResume,} from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import ApplicationRouter from './application.js';
import uploadResumeMiddleware from '../middleware/uploadResumeMiddleware.js';
import { userInfo } from 'os';
import { AccessRole } from '../middleware/AccessRole.js';
const UserRoutes=express.Router();

UserRoutes.post('/signup',signUp)
UserRoutes.post('/signin',signIn)
UserRoutes.get('/logout',signOut)
UserRoutes.get('/googlelogin',googleSignIn);
UserRoutes.post('/request',request);
UserRoutes.put('/update',isAuthenticated, AccessRole(["applicant","admin"]),updateProfile);

UserRoutes.post('/followCompany/:id',isAuthenticated,AccessRole(['applicant','admin']),followCompany);
UserRoutes.get('/followingCompanies',isAuthenticated,AccessRole(['applicant','admin']),followedCompanies);

UserRoutes.post('/jobprefrences',isAuthenticated,AccessRole(['applicant','admin']),SetjobPreference);
UserRoutes.get('/jobprefrences',isAuthenticated,AccessRole(['applicant','admin']),getjobPreference);

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
UserRoutes.post("/save-job/:id",isAuthenticated,AccessRole(['applicant','admin']),saveJob);
UserRoutes.get("/saved-jobs",isAuthenticated,AccessRole(['applicant','admin']),getSavedJobs);
UserRoutes.get('/me',getdata);


export default UserRoutes