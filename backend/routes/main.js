import express from 'express';
import UserRoutes from './user.js';
import CompanyRoutes from './company.js';
const routes=express.Router();

routes.use('/candidate',UserRoutes)
routes.use('/company',CompanyRoutes)
export default routes