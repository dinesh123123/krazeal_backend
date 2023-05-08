// create about us model schema
const mongoose=require('mongoose');
const aboutSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =aboutModel= mongoose.model("about",aboutSchema);