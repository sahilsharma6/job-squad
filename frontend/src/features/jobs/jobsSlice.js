import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  selectedJob: null,
  filters: {
    companyId: "",
    jobTitle: "",
    jobSector: "",
    jobRole: "",
    jobType: [],
    minSalary: "",
    maxSalary: "",
    jobStatus: "",
    jobLocation: "",
    skillsRequired: "",
    sortField: "jobPostedDate",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  },
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
    updateFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: 1,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setSelectedJob, clearSelectedJob, updateFilters, resetFilters } = jobsSlice.actions;

export default jobsSlice.reducer;