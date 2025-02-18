import express from 'express';
const ApplicationRouter = express.Router();
import { createApplication, deleteApplication, downloadResume, getApplicationByApplicantId, getApplicationByCompanyId, getApplicationById, getApplicationByJobId, getApplications, updateApplication } from '../controllers/Application.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { AccessRole } from '../middleware/AccessRole.js';
import uploadResumeMiddleware from '../middleware/uploadResumeMiddleware.js';
// Routes
ApplicationRouter.get('/applications',isAuthenticated,AccessRole(['applicant','company','admin']),getApplications);
ApplicationRouter.get('/applications/:appId',isAuthenticated,AccessRole(['applicant','company','admin']), getApplicationById);


ApplicationRouter.post('/apply/:jobId',isAuthenticated,AccessRole(['applicant','admin']), uploadResumeMiddleware,createApplication);
ApplicationRouter.put('/applications/:appId',isAuthenticated,AccessRole(['applicant','admin']),updateApplication);
ApplicationRouter.delete('/applications/:appId',isAuthenticated,AccessRole(['applicant','admin']),deleteApplication);

ApplicationRouter.get('/download-resume/:appId',isAuthenticated,AccessRole(['applicant','admin','company']),downloadResume);
ApplicationRouter.get('/job-applications/:jobId',isAuthenticated,AccessRole(['company','admin']),getApplicationByJobId);  // company wants to get all application of a job 
ApplicationRouter.get('/company-applications/:companyId',isAuthenticated,AccessRole(['company','admin']),getApplicationByCompanyId); // company wants to get all application of a company
ApplicationRouter.get('/applicant-applications/:applicantId',isAuthenticated,AccessRole(['applicant','admin']),getApplicationByApplicantId); // applicant wants to get all application of a applicant

export default ApplicationRouter;