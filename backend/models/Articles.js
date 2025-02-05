import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const Article = mongoose.model('Article', articleSchema);

export default Article;