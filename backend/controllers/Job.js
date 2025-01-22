import e from "express";
import JobSchema from "../models/Job.js";
import JobSector from "../models/JobSector.js";
import Pagination from "../services/Pagination.js";
//get all jobs, get job by id, create job, update job, delete job
export async function getAllJobs(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const getAll = await JobSchema.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Pagination.paginate(JobSchema, {}, { page, limit });
        res.status(200).json(total);
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    };
}

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

        // Construct query object
        let query = {};

        if (companyId) query.companyId = companyId;

        // Enhanced search on jobTitle with case-insensitive regex
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

        // Skill search (checks if any of the provided skills are in the skillsRequired array)
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

        // Execute query with sorting, pagination, and population
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
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function getJobById(req, res) {
    try {
        const { jobdId } = req.params;
        const getJob = await Pagination.paginate(JobSchema, { _id: jobdId }, { page, limit });
        res.status(200).json({ getJob, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

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
            const isJobSector = await JobSector({ name: jobSector });
            if (isJobSector._id) {
                jobSector = isJobSector.name;
            }
            else {
                return res.status(400).json({ message: 'Job Sector not found', success: false });
            }
        }

        const newJob = new Job({
            companyId: req.user.userId,
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

        await newJob.save();
        res.status(201).json({ job: newJob, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

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
        if (jobSector) {
            const isJobSector = await JobSector({ name: jobSector });
            if (isJobSector._id) {
                jobSector = isJobSector.name;
            }
            else {
                return res.status(400).json({ message: 'Job Sector not found', success: false });
            }
        }
        const updatedJob = await Job.findByIdAndUpdate(
            { _id: jobId, companyId: req.user.userId },
            {
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
            },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ updatedJob, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function deleteJob(req, res) {
    try {
        const { jobId } = req.params;
        const deleteJob = await JobSchema.findOneAndDelete({ _id: jobId, companyId: req.user.userId });
        if (!deleteJob) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function createJobSector(req, res) {
    try {
        const { name } = req.body;
        const newJobSector = new JobSector({ name });
        await newJobSector.save();
        res.status(201).json({ newJobSector, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function getJobSectors(req, res) {
    try {
        const jobSectors = await JobSector.find();
        res.status(200).json({ jobSectors, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function getJobSectorById(req, res) {
    try {
        const { sectorId } = req.params;
        const jobSector = await JobSector.findById({ _id: sectorId });
        if (!jobSector) {
            return res.status(404).json({ message: 'Job Sector not found' });
        }
        res.status(200).json({ jobSector, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}
