import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    degreeName: {
        type: String,
        required: true
    },
    instituteName: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    percentage: {
        type: Number,
        // required: true
    },
    cgpa: {
        type: Number,
        // required: true
    },
});

const Education = mongoose.model('Education', educationSchema);

export default Education;
