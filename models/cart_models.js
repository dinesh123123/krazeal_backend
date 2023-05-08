/*const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    gst: {
        type:String,
        
    },
    color: {
        type:String,
        
    },
    size: {
        type:String,
        
    },

    duration: {
        type:String,
        
    },
    prices: {
        type:String,
        
    },
    delevery_charge: {
        type: String,
       
    },
    status: {
        type:String,
        default:"pending",
       
    },
    

},{timestamps:true});
module.exports =cartModel= mongoose.model('cart', cartSchema);*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },

 productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },

    qty: 
      {
        type: Number,
       default:1,
      },

    price: {
      type: Number,
      required: false
    },
    total: {
      type: Number,
      required: false
    }
  },
  { 
    timestamps: true 
  });

  const cartSchema = new Schema({

    items: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number
    }
  },
  { 
    timestamps: true 
  });

module.exports =cartModel= mongoose.model('cart',cartSchema);
