import express from 'express';
import UserRoutes from './user.js';
import CompanyRoutes from './company.js';
import JobRoutes from './job.js';
const routes=express.Router();

routes.use('/candidate',UserRoutes)
routes.use('/company',CompanyRoutes)
routes.use('/job',JobRoutes)
export default routes