
// create product model schema
const mongoose=require('mongoose');
const likeSchema = new mongoose.Schema({
	
 userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    


status:{
		type:Number,
	   default:0
	},


},{timestamps:true});
module.exports = likeModel= mongoose.model("like",likeSchema);
