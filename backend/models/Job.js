import mongoose from 'mongoose';
const jobQuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    fieldName: {
        type: String,
        required: true
    },
    options: [
        {
            label: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ]
});

const jobSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobSector: {
        type: String,
    },
    jobRole: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String,
    },
    experience: {
        type: String,
    },
    jobLevel: {
        type: String
    },
    tools: {
        type: [String]
    },
    jobCity: { 
        type: String,
    },
    jobState: {
        type: String,
    },
    jobCountry: {
        type: String,
    },
    jobZipCode: {
        type: String,
    },
    minSalary: {
        type: Number,
    },
    maxSalary: {
        type: Number,
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
    },
    jobQuestions: [jobQuestionSchema] // Use the defined jobQuestionSchema
});
const Job = mongoose.model('Job', jobSchema);
export default Job;