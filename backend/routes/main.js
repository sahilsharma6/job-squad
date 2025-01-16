import express from 'express';
import Userroutes from './user.js';
import Companyroutes from './company.js';
const routes=express.Router();

routes.use('/candidate',Userroutes)
routes.use('/company',Companyroutes)
export default routes