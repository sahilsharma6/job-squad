import { useState } from 'react';
import { useGetAllCompaniesQuery, useGetCompanyByIdQuery } from '../features/company/companiesApi';
import { Building2 } from 'lucide-react';

export const useCompanies = () => {
  const [currentCompanyId, setCurrentCompanyId] = useState(null);

  // Fetch all companies
  const {
    data: companiesData,
    isLoadingCompany: isCompaniesLoading,
    error: companiesError,
    refetch: refetchCompanies
  } = useGetAllCompaniesQuery();

  // Ensure companiesData is always an array to avoid .map() errors
  const safeCompaniesData = Array.isArray(companiesData) ? companiesData : [];

  // Fetch company by ID (if one is selected)
  const {
    data: currentCompany,
    isLoadingCompany: isCompanyLoading
  } = useGetCompanyByIdQuery(currentCompanyId, { skip: !currentCompanyId });

  // Create a loading state (true if any of the queries are loading)
  const isLoadingCompany = isCompaniesLoading || isCompanyLoading;

  // Transform companies for SlidingBanner
  const companiesForBanner = safeCompaniesData.map(company => ({
    title: company.companyName,
    subtitle: company.companyDescription || 'Leading company in the industry',
    icon: company.companyLogo ? [company.companyLogo] : Building2,
    onClick: () => handleCompanyClick(company._id),
  }));

  // Handle company selection
  const handleCompanyClick = (companyId) => {
    setCurrentCompanyId(companyId);
    window.location.href = `/company/${companyId}`; // Navigate to company details page
  };

  return {
    companies: safeCompaniesData,
    companiesForBanner,
    currentCompany,
    isLoadingCompany, // Unified loading state
    isCompaniesLoading, // Specific loading state for all companies
    isCompanyLoading, // Specific loading state for one company
    error: companiesError,
    setCurrentCompanyId,
    refetchCompanies
  };
};
