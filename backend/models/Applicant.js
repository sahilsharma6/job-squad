import exp from 'constants';
import mongoose from 'mongoose';
import { join } from 'path';

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
    },
    savedJobs:{
        jobs:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        },],
    },
    personalWebsite:{
        type: String,
    },
    dateOfBirth:{
        type: Date,
    },
    gender:{
        type: String,
    },
    joiningDate:{
        type: Date,
    },
    educationLevel:{
        type: String,
    },
    languages:{
        type: [String],
    },
    experience:{
        type: String,
    },
    jobCategory:{
        type: String,
    },
    currentMinSalary:{
        type: Number,
    },
    currentMaxSalary:{
        type: Number,
    },
    expectedMinSalary:{
        type: Number,
    },
    expectedMaxSalary:{
        type: Number,
    },
    followingCompanies:{
        companies:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },],
    },

});

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;


