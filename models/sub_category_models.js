
// create user location model schema
const mongoose=require('mongoose');
const sub_categorySchema = new mongoose.Schema({

name:{         
	type:String,
	required:true
},
image:{         
	type:String
	
},
categoryId:{         
	type:String
	
},


},{timestamps:true});
module.exports =sub_categoryModel= mongoose.model("sub_category",sub_categorySchema );