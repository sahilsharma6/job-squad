import express from 'express';
import UserRoutes from './user.js';
import CompanyRoutes from './company.js';
import JobRoutes from './job.js';
import ApplicationRouter from './application.js';
const routes=express.Router();

routes.use('/user',UserRoutes)
routes.use('/company',CompanyRoutes)
routes.use('/jobs',JobRoutes)
routes.use('/job-application',ApplicationRouter)
export default routes