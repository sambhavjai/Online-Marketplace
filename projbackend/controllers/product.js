const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { rawListeners } = require('npm');

exports.getProductById = (req,res,next,id) => {
    Product.findById(id).populate("category").exec((err,product) => {
        if(err || !product)
        {
            return res.status(400).json({
                error: "Not able to find the product"
            });
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err)
        {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        const {name,description,price,category,stock} = fields;
        if(!name || !description || !price || !category || !stock)
        {
            return res.status(400).json({
                error: "Some fields are missing"
            });
        }
        let product = new Product(fields);
        if(file.photo)
        {
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

        }
        product.save((err,product) => {
            if(err || !product)
            {
                return res.status(400).json({
                    error: "Not able to save the product"
                });
            }
            return res.json(product);
        })
    })
}