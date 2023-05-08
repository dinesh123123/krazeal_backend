// create term us model schema
const mongoose=require('mongoose');
const productSchema = new mongoose.Schema({

product_name:{
	type:String 
},

category_name:{
	type:String 
},


price:{
	type:String,
},

sale_price:{
	type:String,
},

discount_percantage:{
	type:String,

},


refund_pollicy:{
	type:String,	
},
category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },



instock:{
       type:String,
},

description:{
		type:String,
	},


	weight:{
		type:String,
	},
	height:{
		type:String,
	},
	width:{
		type:String,
	},
	length:{
		type:String,
	},

	
	
size:[],
color:[],

images:{
	type:Array,
},


},{timestamps:true});
module.exports =productModel= mongoose.model("product", productSchema);