const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category) => {
        if(err || !category)
        {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        req.category = category;
        next();
    });
};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,category) => {
        if(err || !category)
        {
            return res.status(400).json({
                error: "Not able to save the category"
            });
        }
        return res.json({category});
    })
};

exports.getCategory = (req,res) => {
    return res.json(req.category);
}

exports.getAllCategories = (req,res) => {
    Category.find().exec((err,category) => {
        if(err || !category)
        {
            return res.status(400).json({
                error: "Not able to get all categories"
            });
        }
        return res.json(category);
    });
};

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err,category) => {
        if(err || !category)
        {
            return res.status(400).json({
                error: "Not able to update the category"
            });
        }
        return res.json(category);
    });
};