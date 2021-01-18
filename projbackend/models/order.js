const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const orderSchema=new mongoose.Schema({
    product:{
        type: [productCartSchema]
    },
    transaction_id:{
    },
    amount:{
        type: Number
    },
    status:{
        type: String,
        default: "Recieved",
        enum: ["Cancelled","Shipped","Processing","Recieved"]
    },
    address:{
        type: String
    },
    updated:{
        type: Date
    },
    user:{
        type: ObjectId,
        ref: "User" 
    }
},
{
    timestamps: true
});

const productCart=mongoose.model("productCart",productCartSchema);
const Order=mongoose.model("Order",orderSchema);

module.exports={Order,productCart};