const category = require('../models/category');

exports.getCategoryById = (req,res,next,id) => {
    category.findById(id).exec((err,category) => {
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