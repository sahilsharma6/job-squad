//get all jobs, get job by id, create job, update job, delete job
export async function getAllJobs(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const getAll = await JobSchema.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await JobSchema.countDocuments();
        res.status(200).json({ getAll, total, page, pages: Math.ceil(total / limit), success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    };
}

export async function getJobById(req, res) {
    try {
        const { jobdId } = req.params;
        const getJob=await JobSchema.findById({_id:jobdId})
        res.status(200).json({getJob, success: true});
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function createJob(req, res) {
    try {
        const { title, description, location, salary } = req.body;
        const newJob = new JobSchema({ title, description, location, salary });
        const saveJob = await newJob.save();
        res.status(201).json({ saveJob, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function updateJob(req, res) {
    try {
        const { jobId } = req.params;
        const { title, description, location, salary } = req.body;
        const updateJob = await JobSchema.findByIdAndUpdate({ _id: jobId }, { title, description, location, salary }, { new: true });
        if(!updateJob){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ updateJob, success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}

export async function deleteJob(req, res) {
    try {
        const { jobId } = req.params;
        const deleteJob = await JobSchema.findByIdAndDelete({ _id: jobId });    
        if(!deleteJob){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
}