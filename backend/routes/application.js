import express from 'express';
const ApplicationRouter = express.Router();
import applicationController from '../controllers/application.js';
// Routes
ApplicationRouter.get('/applications', applicationController.getApplications);
ApplicationRouter.get('/applications/:id', applicationController.getApplicationById);
ApplicationRouter.post('/applications', applicationController.createApplication);
ApplicationRouter.put('/applications/:id', applicationController.updateApplication);
ApplicationRouter.delete('/applications/:id', applicationController.deleteApplication);

export default ApplicationRouter;