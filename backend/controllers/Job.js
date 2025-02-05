import e from "express";
import JobSchema from "../models/Job.js";
import JobRole from "../models/jobRole.js";
import JobSector from "../models/JobSector.js";
import Pagination from "../services/Pagination.js";

// Get all jobs
export async function getAllJobs(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const jobs = await JobSchema.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Pagination.paginate(JobSchema, {}, { page, limit });
        res.status(200).json(total);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Get jobs by filters
export async function getJobByFilter(req, res) {
    try {
        const {
            companyId,
            jobTitle,
            jobSector,
            jobRole,
            jobType,
            minSalary,
            maxSalary,
            jobStatus,
            jobLocation,
            skillsRequired,
            sortField,
            sortOrder,
            page = 1,
            limit = 10
        } = req.query;

        let query = {};

        if (companyId) query.companyId = companyId;

        if (jobTitle) {
            query.jobTitle = {
                $regex: `^${jobTitle.trim()}`,
                $options: 'i'
            };
        }

        if (jobSector) query.jobSector = jobSector;
        if (jobRole) query.jobRole = jobRole;
        if (jobType) query.jobType = jobType;
        if (minSalary) query.minSalary = { $gte: minSalary };
        if (maxSalary) query.maxSalary = { $lte: maxSalary };
        if (jobStatus) query.jobStatus = jobStatus;
        if (jobLocation) query.jobLocation = { $regex: jobLocation, $options: 'i' };

        if (skillsRequired) {
            const skillsArray = skillsRequired.split(',').map(skill => skill.trim());
            query.skillsRequired = { $in: skillsArray };
        }

        let sortOptions = {};
        if (sortField) {
            const order = sortOrder === 'desc' ? -1 : 1;
            sortOptions[sortField] = order;
        } else {
            sortOptions = { jobTitle: 1 };
        }

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const jobs = await JobSchema.find(query)
            .populate('companyId')
            .populate('jobSector')
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);

        const totalCount = await JobSchema.countDocuments(query);

        res.status(200).json({
            totalPages: Math.ceil(totalCount / limitNum),
            currentPage: pageNum,
            totalItems: totalCount,
            jobs
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get job by ID
export async function getJobById(req, res) {
    try {
        const { jobId } = req.params;
        const job = await JobSchema.findById(jobId).populate('companyId').populate('jobSector');
        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }
        res.status(200).json({ job, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// get job by company ID
export async function getJobByCompanyId(req, res) {
    try {
        const { companyId } = req.params;
        const jobs = await JobSchema.find({ companyId });
        res.status(200).json({ jobs, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}




// Create a new job
export async function createJob(req, res) {
    try {
        const {
            companyId,
            jobTitle,
            jobSector,
            jobRole,
            jobDescription,
            jobType,
            jobLocation,
            jobCity,
            jobState,
            jobCountry,
            jobZipCode,
            minSalary,
            maxSalary,
            jobVacancy,
            skillsRequired,
            jobDeadline,
            jobStatus,
            jobQuestions
        } = req.body;

        if (!jobTitle || !jobRole || !jobDescription || !jobType || !jobVacancy || !skillsRequired || !jobDeadline) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (jobSector) {
            const existingSector = await JobSector.findOne({ name: jobSector });
            if (!existingSector) {
                return res.status(400).json({ message: 'Job Sector not found', success: false });
            }
        }

        const newJob = new JobSchema({
            companyId: req.user.userId || companyId,
            jobTitle,
            jobSector,
            jobRole,
            jobDescription,
            jobType,
            jobLocation,
            jobCity,
            jobState,
            jobCountry,
            jobZipCode,
            minSalary,
            maxSalary,
            jobVacancy,
            skillsRequired,
            jobDeadline,
            jobStatus: jobStatus || 'active',
            jobQuestions
        });
        const addjobRole = await JobRole.findOneAndUpdate({ name: jobRole }, { $push: { jobs: newJob._id } });
        await addjobRole.save();

        const addJobSector = await JobSector.findOneAndUpdate({ name: jobSector }, { $push: { jobs: newJob._id } });
        await addJobSector.save();
        await newJob.save();
        res.status(201).json({ job: newJob, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}  
    

// Update a job
export async function updateJob(req, res) {
    try {
        const { jobId } = req.params;
        const {
            jobTitle,
            jobSector,
            jobRole,
            jobDescription,
            jobType,
            jobLocation,
            jobCity,
            jobState,
            jobCountry,
            jobZipCode,
            minSalary,
            maxSalary,
            jobVacancy,
            skillsRequired,
            jobDeadline,
            jobStatus,
            jobQuestions
        } = req.body;

        if (!jobTitle || !jobRole || !jobDescription || !jobType || !jobVacancy || !skillsRequired || !jobDeadline) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
         
        const updatedJob = await JobSchema.findById(jobId);

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }

        const updatedJobRole = await JobRole.findOneAndUpdate({ name: updatedJob.jobRole }, { $pull: { jobs: updatedJob._id } });
        await updatedJobRole.save();
        const updatedJobSector = await JobSector.findOneAndUpdate({ name: updatedJob.jobSector }, { $pull: { jobs: updatedJob._id } });
        await updatedJobSector.save();

        updatedJob.jobTitle = jobTitle;
        updatedJob.jobSector = jobSector;
        updatedJob.jobRole = jobRole;
        updatedJob.jobDescription = jobDescription;
        updatedJob.jobType = jobType;
        updatedJob.jobLocation = jobLocation;
        updatedJob.jobCity = jobCity;
        updatedJob.jobState = jobState;
        updatedJob.jobCountry = jobCountry;
        updatedJob.jobZipCode = jobZipCode;
        updatedJob.minSalary = minSalary;
        updatedJob.maxSalary = maxSalary;
        updatedJob.jobVacancy = jobVacancy;
        updatedJob.skillsRequired = skillsRequired;
        updatedJob.jobDeadline = jobDeadline;
        updatedJob.jobStatus = jobStatus || 'active';
        updatedJob.jobQuestions = jobQuestions;

        const addJobRole = await JobRole.findOneAndUpdate
            ({ name: jobRole }, { $push: { jobs: updatedJob._id } });
        await addJobRole.save();

        const addJobSector = await JobSector.findOneAndUpdate({ name: jobSector }, { $push: { jobs: updatedJob._id } });
        await addJobSector.save();

        await updatedJob.save();

        res.status(200).json({ updatedJob, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Delete a job
export async function deleteJob(req, res) {
    try {
        const { jobId } = req.params;
        const deletedJob = await JobSchema.findOneAndDelete({ _id: jobId, companyId: req.user.userId });

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found', success: false });
        }

        const removeJobRole = await JobRole.findOneAndUpdate({ name: deletedJob.jobRole }, { $pull: { jobs: deletedJob._id } });
        await removeJobRole.save();

        const removeJobSector = await JobSector.findOneAndUpdate({ name: deletedJob.jobSector }, { $pull: { jobs: deletedJob._id } });
        await removeJobSector.save();

        res.status(200).json({ message: 'Job deleted successfully', success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Create a job sector
export async function createJobSector(req, res) {
    try {
        const { name } = req.body;
        const newJobSector = new JobSector({ name });
        await newJobSector.save();
        res.status(201).json({ newJobSector, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Get all job sectors
export async function getJobSectors(req, res) {
    try {
        const jobSectors = await JobSector.find();
        res.status(200).json({ jobSectors, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Get a job sector by ID
export async function getJobSectorById(req, res) {
    try {
        const { sectorId } = req.params;
        const jobSector = await JobSector.findById(sectorId);

        if (!jobSector) {
            return res.status(404).json({ message: 'Job Sector not found', success: false });
        }

        res.status(200).json({ jobSector, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

export async function deleteJobSector(req, res) {
    try {
        const { sectorId } = req.params;
        const deletedJobSector = await JobSector.findOneAndDelete({ _id: sectorId });

        if (!deletedJobSector) {
            return res.status(404).json({ message: 'Job Sector not found', success: false });
        }

        res.status(200).json({ message: 'Job Sector deleted successfully', success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

export async function updateJobSector(req, res) {
    try {
        const { sectorId } = req.params;
        const { name } = req.body;

        const updatedJobSector = await JobSector.findOneAndUpdate(
            { _id: sectorId },
            { name },
            { new: true }
        );

        if (!updatedJobSector) {
            return res.status(404).json({ message: 'Job Sector not found', success: false });
        }

        res.status(200).json({ updatedJobSector, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}


// Get job Roles 

export async function getJobRoles(req, res) {
    try {
        const jobRoles = await JobRole.find();
        res.status(200).json({ jobRoles, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Get job Roles by ID

export async function getJobRoleById(req, res) {
    try {
        const { roleId } = req.params;
        const jobRole = await JobRole.findById(roleId);

        if (!jobRole) {
            return res.status(404).json({ message: 'Job Role not found', success: false });
        }

        res.status(200).json({ jobRole, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Create a job role
export async function createJobRole(req, res) {
    try {
        const { name } = req.body;
        const newJobRole = new JobRole({ name });
        await newJobRole.save();
        res.status(201).json({ newJobRole, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}

// Update a job role

export async function updateJobRole(req, res) {
    try {
        const { roleId } = req.params;
        const { name } = req.body;

        const updatedJobRole = await JobRole.findOneAndUpdate(
            { _id: roleId },
            { name },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }

}

// Delete a job role

export async function deleteJobRole(req, res) {
    try {
        const { roleId } = req.params;
        const deletedJobRole = await JobRole.findOneAndDelete({ _id: roleId });

        if (!deletedJobRole) {
            return res.status(404).json({ message: 'Job Role not found', success: false });
        }

        res.status(200).json({ message: 'Job Role deleted successfully', success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
}