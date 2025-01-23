import express from 'express';
const ApplicationRouter = express.Router();
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from '../controllers/Application.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { AccessRole } from '../middleware/AccessRole.js';
// Routes
ApplicationRouter.get('/applications',isAuthenticated,AccessRole(['candidate','company','admin']),getApplications);
ApplicationRouter.get('/applications/:appId',isAuthenticated,AccessRole(['candidate','company','admin']), getApplicationById);
ApplicationRouter.post('/apply/:jobId',isAuthenticated,AccessRole(['candidate','admin']), createApplication);
ApplicationRouter.put('/applications/:appId',isAuthenticated,AccessRole(['candidate']),updateApplication);
ApplicationRouter.delete('/applications/:appId',isAuthenticated,AccessRole(['candidate']),deleteApplication);

export default ApplicationRouter;