import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router";

export function JobCard({ job }) {
  return (
    <Card className="w-[400px] flex flex-col border-primary-ultra/20 bg-base-white">
      <CardHeader className="flex-row items-center gap-4">
        <div className="w-12 h-12 relative">
          <img
            src={job.logo || "/placeholder.svg"}
            alt={`${job.company} logo`}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-primary-black">{job.company}</h3>
          <div className="flex items-center text-sm text-grey-muted">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h4 className="text-xl font-semibold mb-2 text-primary-dark">{job.title}</h4>
        <div className="flex items-center gap-2 text-sm text-grey-muted mb-4">
          <span>{job.jobType}</span>
          <span>•</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {job.timeAgo}
          </div>
        </div>
        <p className="text-sm text-grey-muted mb-4 line-clamp-2">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary"
              className="bg-secondary-ultra/10 text-secondary-dark hover:bg-secondary-ultra/20"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-primary-light font-semibold">
        ${Number.parseInt(job.salary.split("-")[1].trim().replace("K", "000")) / 2000}
          <span className="text-grey-muted font-normal">/Hour</span>
        </div>
        <Link to={`/jobs/${job.id}`} className="text-primary-light hover:text-primary-ultra">
        <Button
        >
          Apply Now
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
