import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const companies = [
  { 
    name: "LinkedIn",
    rating: 4.2,
    reviews: "89k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Adobe",
    rating: 4.3,
    reviews: "7k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Salesforce",
    rating: 4.4,
    reviews: "12k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Rackspace",
    rating: 4.0,
    reviews: "3.5k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "PowerStore",
    rating: 4.1,
    reviews: "2k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Wasp.com",
    rating: 4.3,
    reviews: "5k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Getahead",
    rating: 4.2,
    reviews: "4k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Berkeley",
    rating: 4.5,
    reviews: "8k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Qwirk",
    rating: 4.1,
    reviews: "3k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Nexio",
    rating: 4.2,
    reviews: "1.5k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Toyota",
    rating: 4.3,
    reviews: "15k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Lensta",
    rating: 4.0,
    reviews: "2k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Wisio",
    rating: 4.2,
    reviews: "4k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Square",
    rating: 4.4,
    reviews: "6k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  },
  {
    name: "Visa",
    rating: 4.3,
    reviews: "10k reviews",
    logo: "/api/placeholder/48/48",
    link: "#"
  }
];

const CompanyCard = ({ company }) => (
  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
    <CardContent className="p-4">
      <a href={company.link} className="block">
        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate group-hover:text-blue-600 transition-colors">
              {company.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{company.rating}</span>
              <span className="text-xs text-gray-500 truncate">
                · {company.reviews}
              </span>
            </div>
          </div>
        </div>
      </a>
    </CardContent>
  </Card>
);

const TopRecruiters = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleCompanies = companies.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-ubuntu font-semibold mb-2">Top Recruiters</h2>
          <p className="text-base text-gray-600">
            Discover your next career move, featuring gigs or internships.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            className="rounded-full hover:bg-gray-100"
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            className="rounded-full hover:bg-gray-100"
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {visibleCompanies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentPage(index)}
            className="w-8 h-8 p-0 rounded-full"
            aria-label={`Go to page ${index + 1}`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopRecruiters;
