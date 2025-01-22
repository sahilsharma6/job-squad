import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    userName: {
        type: String,
        // required: true
    },
    phoneNo: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        default: 'applicant',
        // enum: ['applicant', 'admin'],
    },
    bio: {
        type: String,
    },

    skills: {
        type: [String],
    },

    resume: {
        type: String,
    },

    emailNotification:{
        type: Boolean,
    }
});

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;


