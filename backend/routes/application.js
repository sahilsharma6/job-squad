import express from 'express';
const ApplicationRouter = express.Router();
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from '../controllers/Application.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { AccessRole } from '../middleware/AccessRole.js';
// Routes
ApplicationRouter.get('/applications',isAuthenticated,AccessRole(['applicant','company','admin']),getApplications);
ApplicationRouter.get('/applications/:appId',isAuthenticated,AccessRole(['applicant','company','admin']), getApplicationById);
ApplicationRouter.post('/apply/:jobId',isAuthenticated,AccessRole(['applicant','admin']), createApplication);
ApplicationRouter.put('/applications/:appId',isAuthenticated,AccessRole(['applicant']),updateApplication);
ApplicationRouter.delete('/applications/:appId',isAuthenticated,AccessRole(['applicant']),deleteApplication);

export default ApplicationRouter;