// create term us model schema
const mongoose=require('mongoose');
const termSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =termModel= mongoose.model("term", termSchema);