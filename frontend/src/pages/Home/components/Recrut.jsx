import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCompanies } from "@/hooks/useCompanies"
import { useNavigate } from "react-router"

const CompanyCard = ({ company }) => {

  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    const companyNameParam = encodeURIComponent(company.companyName);
    navigate(`/company?name=${companyNameParam}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-4">
        <button onClick={() => handleCompanyClick(company)} className="block">
          <div className="flex items-start gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden group-hover:scale-105 transition-transform flex items-center justify-center bg-gray-100">
              {company.companyLogo ? (
                <img
                  src={company.companyLogo || "/placeholder.svg"}
                  alt={`${company.companyName} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-6 h-6 transition-transform group-hover:scale-110 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate group-hover:text-primary-600 transition-colors">
                {company.companyName}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">N/A</span>
                <span className="text-xs text-gray-500 truncate">· No reviews yet</span>
              </div>
            </div>
          </div>
        </button>
      </CardContent>
    </Card>
  )
}

const CompanyCardSkeleton = () => (
  <Card className="group">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </CardContent>
  </Card>
)

const TopRecruiters = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  const { companies, isLoadingCompany, error } = useCompanies()

  const totalPages = Math.ceil((companies?.length || 0) / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleCompanies = companies?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) || []

  const renderContent = () => {
    if (isLoadingCompany) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CompanyCardSkeleton key={index} />
            ))}
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-10">
          <p className="text-red-500">Error loading companies. Please try again later.</p>
        </div>
      )
    }

    if (!companies || companies.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">No companies available at the moment.</p>
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visibleCompanies.map((company) => (
            <CompanyCard key={company._id} company={company} />
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
      </>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-ubuntu font-semibold mb-2">Top Recruiters</h2>
          <p className="text-base text-gray-600">Discover your next career move, featuring gigs or internships.</p>
        </div>
        {!isLoadingCompany && companies && companies.length > 0 && (
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
        )}
      </div>

      {renderContent()}
    </div>
  )
}

export default TopRecruiters