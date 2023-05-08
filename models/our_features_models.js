// create term us model schema
const mongoose=require('mongoose');
const featuresSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	
},

type:{
	type:String,
	
},



},{timestamps:true});
module.exports =featureModel= mongoose.model("feature", featuresSchema);