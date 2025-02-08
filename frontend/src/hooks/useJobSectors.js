import { useGetFilteredJobsQuery } from '../features/jobs/jobsApi';
import { Building2 } from 'lucide-react';

export const useJobSectors = () => {
  const { data } = useGetFilteredJobsQuery({ limit: 1000 }); // Get all jobs to count sectors

  const getSectorStats = () => {
    if (!data?.jobs) return [];

    // Count jobs by sector
    const sectorCounts = data.jobs.reduce((acc, job) => {
      const sector = job.jobSector || 'Other';
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {});

    // Transform into format needed for SlidingBanner
    return Object.entries(sectorCounts).map(([sector, count]) => ({
      title: sector,
      subtitle: `${count} jobs available`,
      icon: Building2,
      onClick: () => handleSectorClick(sector)
    }));
  };

  const handleSectorClick = (sector) => {
    // You can implement navigation or filtering logic here
    window.location.href = `/jobs?sector=${encodeURIComponent(sector)}`;
  };

  return {
    sectorStats: getSectorStats(),
    isLoading: !data
  };
};