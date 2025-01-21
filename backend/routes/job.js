import { Router } from "express";
import { getAllJobs,createJob,getJobById,updateJob,deleteJob, getJobByFilter, getJobSectors, getJobSectorById, createJobSector } from "../controllers/Job.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { AccessRole } from "../middleware/AccessRole.js";

const JobRoutes = Router();

JobRoutes.get("/all",getAllJobs);
JobRoutes.get("/jobbyfilters",getJobByFilter);
JobRoutes.get("/:jobId",isAuthenticated,AccessRole(['candidate','company','admin']) ,getJobById);
JobRoutes.post("/create",isAuthenticated,AccessRole(['company','admin']) ,createJob);
JobRoutes.put("/update/:jobId",isAuthenticated,AccessRole(['company','admin']) ,updateJob);
JobRoutes.delete("/delete/:jobId",isAuthenticated,AccessRole(['company','admin']) ,deleteJob);

//get Job Sectors
JobRoutes.get('/jobsectors',getJobSectors);
JobRoutes.get('/jobsector/:sectorId',getJobSectorById);
JobRoutes.post('/create-job-sector',isAuthenticated,AccessRole(['admin']),createJobSector);

export default JobRoutes;