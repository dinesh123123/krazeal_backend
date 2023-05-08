// create return us model schema
const mongoose=require('mongoose');
const returnSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =returnModel= mongoose.model("return",returnSchema);