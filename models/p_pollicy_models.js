// create pollicy us model schema
const mongoose=require('mongoose');
const pollicySchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =pollicyModel= mongoose.model("pollicy",pollicySchema);