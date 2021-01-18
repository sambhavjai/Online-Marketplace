const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

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

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.photo = (req,res,next) => {
    if(req.product.photo)
    {
        res.set("Content-Type",req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req,res) =>{
    let product = req.product;
    product.remove((err,product) => {
        if(err || !product)
        {
            return res.status(400).json({
                error: "Not able to delete the product"
            });
        }
        return res.json({
            message: `${product.name} product deleted`
        });
    })
}

exports.updateProduct = (req,res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err)
        {
            return res.status(400).json({
                error: "Problem with the image"
            });
        }

        let product = req.product;
        product = _.extend(product,fields);

        if(file.photo)
        {
            if(file.photo.size>3000000)
            {
                return res.status(400).json({
                    error: "File size is too large"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err,product) => {
            if(err || !product)
            {
                return res.status(400).json({
                    error: "Updation failed"
                });
            }
            return res.json(product);
        });
    });
}

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find().sort([[sortBy,"asc"]]).select("-photo").populate("category").limit(limit).exec((err,products) => {
        if(err || !products)
        {
            return res.status(400).json({
                error: "No products to display"
            });
        }
        return res.json(products);
    });
}

exports.updateStock = (req,res,next) => {
    let operations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: {_id:product._id},
                update: {$inc: {stock: -product.count, sold: +product.count}}
            }
        };
    });
    Product.bulkWrite(operations,{},(err,products) => {
        if(err)
        {
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category",{},(err,category) => {
        if(err)
        {
            return res.status(400).json({
                error: "Not able to get categories"
            });
        }
        return res.json(category);
    });
}