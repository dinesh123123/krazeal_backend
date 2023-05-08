// create rentbenifit us model schema
const mongoose=require('mongoose');
const rent_benifitSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports = rent_benifitModel= mongoose.model( "rent_benifit", rent_benifitSchema);