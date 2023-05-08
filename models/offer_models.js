// create about us model schema
const mongoose=require('mongoose');
const offerSchema = new mongoose.Schema({

title:{
	type:String
	 
},
text:{
	type:String,
	
},

code:{
	type:String,
	
},


ex_date:{
	type:String,
	
},

image:{
	type:String,
	
},

});
module.exports =offerModel= mongoose.model("offer",offerSchema);