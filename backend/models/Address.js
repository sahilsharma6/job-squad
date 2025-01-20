import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    type: {
        type: String,
        // required: true
        // enum:["permanent","current"]
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;