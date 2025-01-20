import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        // required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        // required: true
    },
    currentlyWorking: {
        type: Boolean,
        required: true
    }

});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;