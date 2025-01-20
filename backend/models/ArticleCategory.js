
import mongoose from 'mongoose';

const articleCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    articles: [{

         articleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        },
    }]
});

const ArticleCategory = mongoose.model('ArticleCategory', articleCategorySchema);

export default ArticleCategory;
