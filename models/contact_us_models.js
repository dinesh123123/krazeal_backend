// create contact us model schema
const mongoose=require('mongoose');
const contactSchema = new mongoose.Schema({
whatsapp:{
	type:String,
	required:false,
},
email_address:{
	type:String,
	required:false,
}



},{timestamps:true});
module.exports = ContactModel= mongoose.model("contact",contactSchema);