const {Order,productCart} = require('../models/order');

exports.getOrderById = (req,res,next,id) => {
    Order.findById(id).populate("products.product","name price").exec((err,order) => {
        if(err || !order)
        {
            return res.status(400).json({
                error: "No order was found"
            });
        }
        req.order = order;
        next();
    });
}