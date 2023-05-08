

// create user location model schema
const mongoose=require('mongoose');
const feedbackSchema = new mongoose.Schema({

title:{         
	type:String,
	
},
image:{         
	type:String
	
},
text:{         
	type:String,
	
	
},



},{timestamps:true});
module.exports =feedbackModel= mongoose.model("feedback",feedbackSchema);