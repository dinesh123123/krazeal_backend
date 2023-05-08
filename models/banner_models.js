
// create product model schema
const mongoose=require('mongoose');
const bannerSchema = new mongoose.Schema({
	
title:{
	type:String,
	
},


image:{
		type:String,
	},


},{timestamps:true});
module.exports = BannerModel= mongoose.model("banner",bannerSchema);
