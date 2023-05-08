
// create user location model schema
const mongoose=require('mongoose');
const userLocationSchema = new mongoose.Schema({
userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
address:{         
	type:String,
},	

land_Mark:{         
	type:String
	
},

pincode:{         
	type:String,
	
},
city:{         
	type:String,
	
},

geo_location:{         
	type:{type:String},
	coordinates:[]
},
},{timestamps:true});
userLocationSchema.indexes({location:"2dsphere"});
module.exports =locationModel=mongoose.model("location",userLocationSchema);