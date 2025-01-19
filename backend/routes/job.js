import { Router } from "express";
import { getAllJobs,createJob,getJobById,updateJob,deleteJob } from "../controllers/Job";
import isAuthenticated from "../middleware/isAuthenticated";
import { isAccess } from "../middleware/isAccess";

const JobRoutes = Router();

JobRoutes.get("/all",getAllJobs);
JobRoutes.get("/:jobId",isAuthenticated,isAccess(['candidate','company','admin']) ,getJobById);
JobRoutes.post("/create",isAuthenticated,isAccess(['company','admin']) ,createJob);
JobRoutes.put("/update/:jobId",isAuthenticated,isAccess(['company','admin']) ,updateJob);
JobRoutes.delete("/delete/:jobId",isAuthenticated,isAccess(['company','admin']) ,deleteJob);

export default JobRoutes;