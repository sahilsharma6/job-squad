import express from 'express';
import UserRoutes from './user.js';
import CompanyRoutes from './company.js';
import JobRoutes from './job.js';
import ApplicationRouter from './application.js';
const routes=express.Router();

routes.use('/candidate',UserRoutes)
routes.use('/company',CompanyRoutes)
routes.use('/job',JobRoutes)
routes.use('/job-application',ApplicationRouter)
export default routes