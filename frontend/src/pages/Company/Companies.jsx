import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Phone, Mail } from "lucide-react";
import { companiesData } from './companies-data';

const Companies = () => {
  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    const companyNameParam = encodeURIComponent(company.companyName);
    navigate(`/company?name=${companyNameParam}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Companies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companiesData.map((company) => (
          <Card 
            key={company._id} 
            className="hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCompanyClick(company)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={company.companyLogo}
                  alt={company.companyName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{company.companyName}</h3>
                  <a 
                    href={company.companyWebsite}
                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {company.companyDescription}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {company.contactPersonEmail}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {company.contactPersonPhone}
                </div>
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompanyClick(company);
                }}
              >
                View Company
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Companies;