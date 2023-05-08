// create refferal us model schema
const mongoose=require('mongoose');
const refferalSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =refferalModel= mongoose.model("refferal",refferalSchema);