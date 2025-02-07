
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ApplicantJobAlerts = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  
  const alerts = [
    {
      id: "01",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "unread"
    },
    {
      id: "02",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "read"
    },
    {
      id: "03",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "unread"
    },
    {
      id: "04",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "read"
    },
    {
      id: "05",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "read"
    },
    {
      id: "6",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "unread"
    },
    {
      id: "7",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "read"
    },
    {
      id: "8",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "unread"
    },
    {
      id: "9",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "read"
    },
    {
      id: "10",
      notification: "There are many variations of passages orem psum available",
      date: "Oct 22, 2024",
      status: "read"
    }
  ];

  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = alerts.slice(startIndex, endIndex);

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Job Alerts ({alerts.length})</h2>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">No</TableHead>
              <TableHead>Notification</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.id}</TableCell>
                <TableCell>{alert.notification}</TableCell>
                <TableCell>{alert.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={alert.status === 'unread' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                    }
                  >
                    {alert.status === 'unread' ? 'Unread' : 'Read'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    className="inline-flex items-center"
                  >
                    {alert.status === 'unread' ? (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Mark As Read
                      </>
                    ) : (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Mark As Unread
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};