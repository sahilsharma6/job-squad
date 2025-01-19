import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema({

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    jobTitle: {
        type: String,
        required: true
        // enum: ['Full Time', 'Part Time', 'Internship']
    },
    jobRole: {
        type: String,
        required: true
        // enum:["web-developer","software-developer","data-analyst","data-scientist","product-manager","project-manager","business-analyst","business-development","marketing","sales","finance","human-resource","designer","others"]
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
        // enum: ['Remote', 'Hybrid', 'On-site']
    },
    jobLocation: {
        type: String,
        // required: true
    },
    jobCity: { 
        type: String,
        // required: true
    },
    jobState: {
        type: String,
        // required: true
    },
    jobCountry: {
        type: String,
        // required: true
    },
    jobZipCode: {
        type: String,
        // required: true
    },
    minSalary: {
        type: Number,
        // required: true
    },
    maxSalary: {
        type: Number,
        // required: true
    },
    jobVacancy: {
        type: Number,
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    jobPostedDate: {
        type: Date,
        default: Date.now
    },
    jobDeadline: {
        type: Date,
        required: true
    },
    jobStatus: {
        type: String,
        default: 'active',
        // enum: ['active', 'inactive']
    },
    jobQuestions: {
        type: [String],
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;


