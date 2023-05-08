// create shipping_pollicy us model schema
const mongoose=require('mongoose');
const shipping_pollicySchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =shipping_pollicyModel= mongoose.model("shipping_pollicy",shipping_pollicySchema);