Quarries - 

CompanyRoutes.get('/:id',isAuthenticated,AccessRole(['company','admin']),getCompanyById); - remove this isAuthenticated,AccessRole(['company','admin'])