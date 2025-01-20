import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const JobSectorSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('JobSector', JobSectorSchema);