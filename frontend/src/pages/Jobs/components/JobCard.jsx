import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const JobCard = ({ job, viewMode }) => {
  const navigate = useNavigate();


  const handleViewDetails = () => {
    // Create URL-safe versions of the company and position
    const companyParam = encodeURIComponent(job.companyId);
    const positionParam = encodeURIComponent(job.jobTitle);
    
    // Navigate using query parameters
    navigate(`/jobs?company=${companyParam}&position=${positionParam}`);
  };

  return (
    <Card className={viewMode === "grid" ? "h-full" : ""}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
            <p className="text-sm text-gray-500">{job.companyId}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4" />
            {job.jobLocation}
          </div>
          <div className="flex items-center text-sm">
            <Briefcase className="mr-2 h-4 w-4" />
            {job.jobType}
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4" />
            {job.minSalary} - {job.maxSalary}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
