import express from 'express';
const ApplicationRouter = express.Router();
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication } from '../controllers/Application.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { isAccess } from '../middleware/isAccess.js';
// Routes
ApplicationRouter.get('/applications',isAuthenticated,isAccess(['candidate','company','admin']),getApplications);
ApplicationRouter.get('/applications/:id',isAuthenticated,isAccess(['candidate','company','admin']), getApplicationById);
ApplicationRouter.post('/apply',isAuthenticated,isAccess(['candidate','admin']), createApplication);
ApplicationRouter.put('/applications/:id',isAuthenticated,isAccess(['candidate','admin']),updateApplication);
ApplicationRouter.delete('/applications/:id',isAuthenticated,isAccess(['candidate','admin']),deleteApplication);

export default ApplicationRouter;