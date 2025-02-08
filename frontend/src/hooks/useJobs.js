import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredJobsQuery, useGetJobByIdQuery } from "../features/jobs/jobsApi";
import { updateFilters, resetFilters } from "../features/jobs/jobsSlice";

export const useJobs = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);
  const [currentJobId, setCurrentJobId] = useState(null);

  const {
    data: filteredData,
    isLoading: isFilteredLoading,
    isFetching: isFilteredFetching,
    error: filteredError,
    refetch: refetchFilteredJobs,
  } = useGetFilteredJobsQuery(filters);

  const { data: currentJob, isLoading: isJobLoading } = useGetJobByIdQuery(currentJobId, { skip: !currentJobId });

  const handleFilterChange = (newFilters) => {
    dispatch(updateFilters(newFilters));
  };

  const handlePageChange = (newPage) => {
    dispatch(updateFilters({ page: newPage }));
  };

  const handleLimitChange = (newLimit) => {
    dispatch(updateFilters({ limit: newLimit, page: 1 }));
  };

  const handleSortChange = (field, order) => {
    dispatch(
      updateFilters({
        sortField: field,
        sortOrder: order,
      })
    );
  };

  const handleSkillsChange = (skills) => {
    const skillsString = Array.isArray(skills) ? skills.join(",") : skills;
    dispatch(updateFilters({ skillsRequired: skillsString }));
  };

  const clearAllFilters = () => {
    dispatch(resetFilters());
  };

  return {
    jobs: filteredData?.jobs || [],
    totalPages: filteredData?.totalPages || 0,
    totalItems: filteredData?.totalItems || 0,
    currentPage: filters?.page || 1,
    filters: filters || {},
    isLoading: isFilteredLoading,
    isFetching: isFilteredFetching,
    error: filteredError,
    currentJob,
    isJobLoading,
    setCurrentJobId,
    handleFilterChange,
    handlePageChange,
    handleLimitChange,
    handleSortChange,
    handleSkillsChange,
    clearAllFilters,
    refetchFilteredJobs,
  };
};