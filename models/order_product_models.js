const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({

	userId:{
		 type: mongoose.Schema.Types.ObjectId,
        ref: "user",
	},
	status:{
		type:String,
	default:"pending",
	},
	total_price:{
		type:String
	},
	shippingAddressId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"location",
	},packed:{
		type:String,

	},
	shippingAddress:{
		type:String
	},
	text:{
		type:String
	},

expected_delevery_date:{
		type:String
	},




},{timestamps:true});

module.exports=orderModel=mongoose.model('order',orderSchema);