import ApplicationSchema from "../models/Application.js";
import JobSchema from "../models/Job.js";
import ApplicantSchema from "../models/Applicant.js";
import AnswerValidation from "../config/QustionValidation.js";
import fs from 'fs';
import path from 'path';
// Controller functions

// GET
export const getApplications = async (req, res) => {
    try {
        const { page, limit } = req.query;
        if (req.user.role === 'admin') {
            const applications = await Pagination.paginate(ApplicantSchema, {}, { page, limit });
            return res.status(200).json({ applications, success: true });
        }
        const findBy = req.user.role === 'company' ? { companyId: req.user.userId } : { applicantId: req.user.userId };
        const applications = await Pagination.paginate(JobSchema, findBy, { page, limit });
        return res.status(200).json({ applications, success: true });

    } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
};

export const getApplicationById = async (req, res) => {
    const { appid } = req.params;
    try {
        if (req.user.role === 'applicant') {
            const application = await ApplicationSchema.findOne({ _id: appid, applicantId: req.user.userId });
            return res.status(200).json({ application, success: true });
        } else if (req.user.role === 'company') {
            const application = await ApplicationSchema.findOneAndUpdate({ _id: appid, status: 'pending' }, // Match by _id and status
                { status: 'viewed' }, // Update status to viewed
                { new: true, upsert: true });
            return res.status(200).json({ application, success: true });
        }
        const application = await ApplicationSchema.findOne({ _id: appid });
        res.status(200).json({ application, success: true });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// POST
export const createApplication = async (req, res) => { 
     try {
    const { jobId } = req.params;

    const getJob = await JobSchema.findById(jobId);
    if (!getJob._id) {
        return res.status(404).json({ message: "Job not found", success: false });
    }
    const applicantDetail = await ApplicantSchema.findById(req.user.userId);
    if (!applicantDetail._id) {
        return res.status(404).json({ message: "Applicant not found", success: false });
    }
    let jobAnswers = [];

    if (getJob.length !== 0) {
        if (req.body.jobAnswers.length !== getJob.jobQuestions.length) {
            return res.status(404).json({ message: "Please provide all the answers", success: false });
        }
        const getErrors = AnswerValidation(getJob.jobQuestions, req.body.jobAnswers);
        if (getErrors.length !== 0) {
            return res.status(404).json({ message: getErrors, success: false });
        }
        jobAnswers = req.body.jobAnswers;
    }

    const resume = req.file.path;

    const newApplication = new ApplicationSchema(
        {
            applicantId: req.user.userId,
            jobId: jobId,
            companyId: getJob.companyId,
            resume: resume,
            coverLetter: req.body.coverLetter,
            chat: false,
            jobAnswers: jobAnswers
        }
    );
  
        await newApplication.save();
        res.status(201).json({newApplication,success:true});
    } catch (error) {
        res.status(500).json({ message: error.message,success:false });
    }
};

// PATCH
export const updateApplication = async (req, res) => {
    const { appId } = req.params;
    const { name, description, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(appId)) return res.status(404).send(`No application with id: ${appId}`);
    const updatedApplication = { name, description, status, _id: appId };
    const findBy=req.user.role==='company'?{companyId:req.user.userId,_id:appId}:{applicantId:req.user.userId,_id:appId};
    await ApplicationSchema.findOneAndUpdate(findBy, updatedApplication, { new: true });
    res.json(updatedApplication);
};

// DELETE
export const deleteApplication = async (req, res) => {
    const { appId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(appId)) return res.status(404).send({message:`No application with id: ${appId}`,success:false});
    await ApplicationSchema.findOneAndDelete({ _id: appId,applicantId:req.user.userId });
    res.json({ message: "ApplicationSchema deleted successfully.",success:true });
};


export const downloadResume = async (req, res) => {
 try{
    const { appId } = req.params;
    const application = await ApplicationSchema.findById(appId);
    if (!application) {
        return res.status(404).json({ message: "Application not found", success: false });
    }
    const applicant = await ApplicantSchema.findById(application.applicantId);
    if (!applicant) {
        return res.status(404).json({ message: "Applicant not found", success: false });
    } 
    const file = application.resume;
    res.status(200).download(file);
 }
 catch(error){
    res.status(500).json({ message: error.message, success: false });
 }
}

export const getApplicationByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await ApplicationSchema.find({ jobId });
        res.status(200).json({ applications, success: true });
    } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
};

export const getApplicationByApplicantId = async (req, res) => {
    try {
        const { applicantId } = req.params;
        const applications = await ApplicationSchema.find({ applicantId });
        res.status(200).json({ applications, success: true });
    } catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
};

export const getApplicationByCompanyId = async (req, res) => {
    try {
        const { companyId } = req.params;
        const applications = await ApplicationSchema.find({ companyId });
        res.status(200).json({ applications, success: true });
    }
    catch (error) {
        res.status(404).json({ message: error.message, success: false });
    }
};






