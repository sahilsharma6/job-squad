import Articles from '../models/Articles.js';
import ArticleCategory from '../models/ArticleCategory.js';



export const getArticles = async (req, res) => {
    try {
        const articles = await Articles.find();
        res.status(200).json(articles);
    } catch (error) {
         console.log(error);
         res.status(500).json({message: "Internal server error"});
    }
}

export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Articles.findById(id);
        res.status(200).json(article);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}


export const createArticle = async (req, res) => {
      try{
        const {title, description, category} = req.body;
          

        const images = req.files.map(file => file.path);
          if(!title || !description || !category){
              return res.status(400).json({message: "All fields are required"});
          }

        const newArticle = new Articles({
            title,
            description,
            category,
            images: images
        });
        const articleCategory = await ArticleCategory.findOne({category});
        articleCategory.articles.push(newArticle._id);
        await newArticle.save();
        res.status(201).json(newArticle);
      }
        catch(error){
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
}

export const updateArticle = async (req, res) => {
  
    try {
        const { id } = req.params;
        const {title, description, category} = req.body;
    
         const images = req.files.map(file => file.path);
        const article = await Articles.findById(id);
        if(!article){
            return res.status(404).json({message: "Article not found"});
        }
        article.title = title;
        article.description = description;
        article.category = category;
        article.images = images;
        await article.save();
        res.status(200).json(article);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Articles.findById(id);
        if(!article){
            return res.status(404).json({message: "Article not found"});
        }

        const articleCategory = await ArticleCategory.findOne({category: article.category});    
        articleCategory.articles.pull(article._id);
        await articleCategory.save();
        await article.remove();
        res.status(200).json({message: "Article deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}


export const getCategories = async (req, res) => {
    try {
        const categories = await ArticleCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name){
            return res.status(400).json({message: "Name is required"});
        }
        const category = new ArticleCategory({name});
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await ArticleCategory.findById(id);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        category.name = name;
        await category.save();

        const articles = await Articles.find({category: category.name});
        for(let article of articles){
            article.category = name;
            await article.save();
        }

        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}


export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await ArticleCategory.findById(id);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }

        await category.remove();
        const articles = await Articles.find({category: category.name});
        for(let article of articles){
            await article.remove();
        }
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

