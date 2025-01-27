import mongoose from "mongoose";


const jobRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    jobs:[{
        
       jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const jobRole= mongoose.model('JobRole', jobRoleSchema);

export default jobRole;

