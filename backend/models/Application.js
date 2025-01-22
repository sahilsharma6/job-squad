import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected','viewed']
    },
    resume: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    }
    ,
    appliedDate: {
        type: Date,
        default: Date.now
    },
    chat: {
        type: Boolean,
    },
    jobAnswers: {
        type: [String],
    }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
