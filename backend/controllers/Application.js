import ApplicationSchema from "../models/Application.js";
import JobSchema from "../models/Job.js";
import ApplicantSchema from "../models/Applicant.js";
import QuestionValidation from "../config/QustionValidation.js";

// Controller functions

// GET
export const getApplications = async (req, res) => {
    try {
        const applications = await ApplicationSchema.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getApplicationById = async (req, res) => {
    const { appid } = req.params;
    try {
        if(req.user.role==='candidate'){
            const application = await ApplicationSchema.findOne({ _id: appid,applicantId:req.user.userId });
            return res.status(200).json(application);
        }
        const application = await ApplicationSchema.findOne({ _id: appid });
        res.status(200).json(application);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// POST
export const createApplication = async (req, res) => {
    const {jobId} =req.params;
    const getJob =await JobSchema.findById(jobId);
    if(!getJob._id){
      return  res.status(404).json({ message: "Job not found",success:false });
    }
    const applicantDetail = await ApplicantSchema.findById(req.userId);
    if(!applicantDetail._id){
        return  res.status(404).json({ message: "Applicant not found",success:false });
    }
    let jobAnswers =[];
    if(getJob.length !== 0){
        if(req.body.jobAnswers.length !==  getJob.jobQuestions.length){
            return res.status(404).json({ message: "Please provide all the answers",success:false });
        }
       const getErrors= QuestionValidation(getJob.jobQuestions,req.body.jobAnswers);
        if(getErrors.length !== 0){ 
            return res.status(404).json({ message: getErrors,success:false });
        }
        jobAnswers = req.body.jobAnswers;
    }
    const newApplication = new ApplicationSchema(
        {
            applicantId: req.userId,
            jobId: jobId,
            companyId: getJob.companyId,
            resume: applicantDetail.resume,
            coverLetter: req.body.coverLetter,
            chat: false,
            jobAnswers: jobAnswers
        }
    );
    try {
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// PATCH
export const updateApplication = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No application with id: ${id}`);
    const updatedApplication = { name, description, status, _id: id };
    await ApplicationSchema.findByIdAndUpdate(id, updatedApplication, { new: true });
    res.json(updatedApplication);
};

// DELETE
export const deleteApplication = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No application with id: ${id}`);
    await ApplicationSchema.findByIdAndRemove(id);
    res.json({ message: "ApplicationSchema deleted successfully." });
};
