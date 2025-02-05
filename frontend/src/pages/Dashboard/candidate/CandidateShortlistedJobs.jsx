import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Download } from "lucide-react";

export const CandidateShortlistedJobs = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  
  const allJobs = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Active",
      icon: "🔷",
      iconBg: "bg-blue-600"
    },
    {
      id: 2,
      title: "Finance Manager",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Active",
      icon: "🔺",
      iconBg: "bg-red-600"
    },
    {
      id: 3,
      title: "Digital Marketing Manager",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Active",
      icon: "📊",
      iconBg: "bg-purple-600"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Active",
      icon: "💬",
      iconBg: "bg-navy-600"
    },
    {
      id: 5,
      title: "Full Stack Engineer",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Expired",
      icon: "💡",
      iconBg: "bg-green-600"
    },
    // Additional jobs for pagination demo
    {
      id: 6,
      title: "UI/UX Designer",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Active",
      icon: "🎨",
      iconBg: "bg-pink-600"
    },
    {
      id: 7,
      title: "Data Scientist",
      company: "Circle Pixel",
      location: "New York, USA",
      date: "Aug 05, 2024",
      status: "Active",
      icon: "📊",
      iconBg: "bg-indigo-600"
    }
  ];

  const totalPages = Math.ceil(allJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = allJobs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Shortlisted Jobs</h2>
        <Select defaultValue="1month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last 1 Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Info</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Download CV</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg ${job.iconBg} flex items-center justify-center text-white text-xl`}>
                    {job.icon}
                  </div>
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-gray-500">
                      {job.company} • {job.location}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{job.date}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </TableCell>
              <TableCell>
                <Badge variant={job.status === "Active" ? "success" : "destructive"}>
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};
