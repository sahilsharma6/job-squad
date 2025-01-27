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
    jobSector: {
        type: String,
        // required: true
        // enum: ['IT', 'Marketing', 'Sales', 'Finance', 'Human Resource', 'Design', 'Others']
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
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        // required: true
    },
    experience: {
        type: String,
        // required: true
        // enum: ['Fresher', '1-2 Years', '3-5 Years', '5-10 Years', '10+ Years']
    },
    jobLevel: {
        type: String
        // enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Top Level']
    },
    tools: {
        type: [String]
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
        type: [
            {
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
            }
        ]
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
