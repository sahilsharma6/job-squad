import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Eye, Check, History, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

// ... CandidateCard component remains the same ...
const CandidateCard = ({ name, title, rating, reviews, location, skills, price }) => (
  <Card className="p-6">
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
        <img src="/api/placeholder/64/64" alt={name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-navy-900">{name}</h3>
            <p className="text-gray-500">{title}</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
            <span className="text-gray-500 ml-1">({reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-blue-600 font-semibold text-xl">
            ${price}<span className="text-gray-500 text-base font-normal">/Hour</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Check className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <History className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="w-4 h-4" className="text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Card>
);
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    if (totalPages <= 1) return range;

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }
    range.push(totalPages);

    for (let i = 0; i < range.length; i++) {
      if (l) {
        if (range[i] - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (range[i] - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(range[i]);
      l = range[i];
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 flex items-center text-gray-400"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className={`w-9 h-9 ${currentPage === page ? 'pointer-events-none' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export const CompanyAllCandidates = () => {
  // Generate more sample data for better pagination demonstration
  const allCandidates = Array.from({ length: 10}, (_, index) => ({
    name: `Candidate ${index + 1}`,
    title: 'Product Designer',
    rating: 5,
    reviews: 560,
    location: '5/B Milford Road, New York',
    skills: ['Figma', 'App', 'PSD', 'Adobe XD', 'Digital'],
    price: 80
  }));

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeframe, setTimeframe] = useState('1month');
  const itemsPerPage = 4;

  // Filter candidates based on search query
  const filteredCandidates = allCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Update current page if it's beyond total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTimeframeChange = (value) => {
    setTimeframe(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the list smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Candidates</h2>
          <div className="flex gap-4">
            <Input 
              className="w-64" 
              type="search" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearch}
            />
            <Select value={timeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last 1 Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedCandidates.map((candidate) => (
          <CandidateCard key={candidate.name} {...candidate} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {filteredCandidates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No candidates found matching your search criteria.
        </div>
      )}
    </div>
  );
};