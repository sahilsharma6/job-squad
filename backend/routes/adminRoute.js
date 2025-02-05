import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { AccessRole } from '../middleware/AccessRole.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { createArticle, createCategory, deleteArticle, deleteCategory, getArticleById, getArticles, getCategories, updateArticle, updateCategory } from '../controllers/ArticleController.js';
import ApplicationRouter from './application.js';
import CompanyRoutes from './company.js';

const AdminRouter = express.Router();


AdminRouter.post('/post-article',isAuthenticated,AccessRole(['admin']), uploadMiddleware,createArticle);
AdminRouter.put('/update-article/:id',isAuthenticated,AccessRole(['admin']), uploadMiddleware,updateArticle);
AdminRouter.delete('/delete-article/:id',isAuthenticated,AccessRole(['admin']),deleteArticle);
AdminRouter.get('/all-articles',isAuthenticated,AccessRole(['admin']),getArticles);
AdminRouter.get('/article/:id',isAuthenticated,AccessRole(['admin']),getArticleById);

AdminRouter.get('/article-category',isAuthenticated,AccessRole(['admin']),getCategories);
AdminRouter.post('/article-category',isAuthenticated,AccessRole(['admin']),createCategory);
AdminRouter.delete('/article-category/:id',isAuthenticated,AccessRole(['admin']),deleteCategory);
AdminRouter.put('/update-article-category/:id',isAuthenticated,AccessRole(['admin']),updateCategory);

AdminRouter.use('/job-application',ApplicationRouter);
AdminRouter.use('/company',CompanyRoutes);



export default AdminRouter;