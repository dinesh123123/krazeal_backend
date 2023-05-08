// creat user model schema
const mongoose=require('mongoose');
const citySchema = new mongoose.Schema({
city:{
	type:String,
	required:true,
},	

image: {
       type: String,
 }

},{timestamps:true});
module.exports = CityModel= mongoose.model("city_list",citySchema);