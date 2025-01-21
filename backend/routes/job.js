import { Router } from "express";
import { getAllJobs,createJob,getJobById,updateJob,deleteJob, getJobByFilter, getJobSectors, getJobSectorById, createJobSector } from "../controllers/Job.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { isAccess } from "../middleware/isAccess.js";

const JobRoutes = Router();

JobRoutes.get("/all",getAllJobs);
JobRoutes.get("/jobbyfilters",getJobByFilter);
JobRoutes.get("/:jobId",isAuthenticated,isAccess(['candidate','company','admin']) ,getJobById);
JobRoutes.post("/create",isAuthenticated,isAccess(['company','admin']) ,createJob);
JobRoutes.put("/update/:jobId",isAuthenticated,isAccess(['company','admin']) ,updateJob);
JobRoutes.delete("/delete/:jobId",isAuthenticated,isAccess(['company','admin']) ,deleteJob);

//get Job Sectors
JobRoutes.get('/jobsectors',getJobSectors);
JobRoutes.get('/jobsector/:sectorId',getJobSectorById);
JobRoutes.post('/create-job-sector',isAuthenticated,isAccess(['admin']),createJobSector);

export default JobRoutes;