import express from 'express';
import { approveCompany, deleteCompany, getAllCompanies, getCompanyById, getValidCompanies, signIn, signOut, signUp, updateCompany } from '../controllers/companyController.js';
import JobRoutes from './job.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { AccessRole } from '../middleware/AccessRole.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { getJobByCompanyId } from '../controllers/Job.js';
const CompanyRoutes=express.Router();

CompanyRoutes.post('/signup',uploadMiddleware,signUp);
CompanyRoutes.post('/signin',signIn);
CompanyRoutes.get('/logout',signOut);



CompanyRoutes.get('/all-companies',isAuthenticated,AccessRole(['admin']),getAllCompanies);
CompanyRoutes.get('/all',getValidCompanies);
CompanyRoutes.get('/:id',getCompanyById); // get company by id   (id is company id)
CompanyRoutes.put('/update/:id',isAuthenticated,AccessRole(['company','admin']),updateCompany); // update company by id   (id is company id)
CompanyRoutes.put('/validate/:id',isAuthenticated,AccessRole(['admin']),approveCompany); // validate company by id   (id is company id)
CompanyRoutes.delete('/delete/:id',isAuthenticated,AccessRole(['admin']),deleteCompany); // delete company by id   (id is company id)

CompanyRoutes.use('/jobs',JobRoutes);
CompanyRoutes.get('/posted-jobs',isAuthenticated,AccessRole(['company','admin']),getJobByCompanyId);

export default CompanyRoutes;