
// create user location model schema
const mongoose=require('mongoose');
const categorySchema = new mongoose.Schema({

name:{         
	type:String,
	required:true
},
image:{         
	type:String
	
},
sub_categoryId:{         
	type:String
	
},


},{timestamps:true});
module.exports =CategoryModel= mongoose.model("category",categorySchema );