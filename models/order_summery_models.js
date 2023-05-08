const mongoose = require('mongoose');
const orderSummerySchema = new mongoose.Schema({

    
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
    },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
     productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },

    total_price: {
        type:String,
        
    },
   

},{timestamps:true});
module.exports =ordersummeryModel= mongoose.model('ordersummery',orderSummerySchema);