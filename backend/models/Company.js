import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    companyDescription:{
        type: String,
        // required: true
    },
    companyLogo:{
        type: String,
    },
    companyWebsite:{
        type: String,
    },
    contactPersonName:{
        type: String,
        required: true
    },
    contactPersonEmail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contactPersonPhone:{
        type: String,
        // required: true
    },
    contactPersonProfile:{
        type: String,
    },
    isValide:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: 'company',
    }
});


const Company = mongoose.model('Company', companySchema);

export default Company;

