
// import dependancies and models in controllers js files
const User=require("../models/user_models");
const Category=require("../models/category_models");
const Banner=require("../models/banner_models");
const Pollicy=require("../models/p_pollicy_models");
const Product=require("../models/product_models");
const Location=require("../models/location_models");
const Like=require("../models/like_models");
const Order_summery=require("../models/order_summery_models");
const Order=require("../models/order_product_models");
const Cart=require("../models/cart_models");



const About=require("../models/about_us_models");
const Term=require("../models/term_models");
const Faq=require("../models/faq_models");
const Offer=require("../models/offer_models");
const Return_pollicy=require("../models/return_pollicy_models");
const Shipping_pollicy=require("../models/shipping_pollicy_models");
const Refferal_term=require("../models/refferal_term_models");
const Feature=require("../models/our_features_models");
const Rent_benifit=require("../models/rent_benifit_models");



const City_list=require("../models/city_list_models");
const Feedback=require("../models/feedback_models");
const Contact=require("../models/contact_us_models");




const Sub_Category=require("../models/sub_category_models");
const jwt =require("jsonwebtoken");




// create Register api using post method
const User_Signup=async(req,res)=>{
	
	const {fname,lname,email,phone,password,otp}=req.body;
    // exist user
	const register_user= await User.findOne({email});
	if(register_user){
	 res.status(400).json({
        result:"false",
        message:"user allready registered, please go to login page..",  
    });

	}else{
		if(fname && email && phone && password){

	    try{
             const Otp = Math.floor(1000 + Math.random() * 9000);
             
            const user = new User({fname,lname,email,phone,password,otp:Otp})
		    const user_data=await user.save()
	        res.status(200).json({
                result:"true",
                message:"user registered sucessfully..",data:user_data});
	    }catch(error){
	        res.status(400).json({result:"false",
                message:"user does not register please try again.."
            })
        }
    }else{
		res.status(400).json({
            result:"false",
            message:"parameter required fname,lname, email, phone, password "
        });
	}
}
};




//create user login api
 const User_Login =async(req,res)=>{
 	const {email,password} =req.body;

    try{
 		if(email && password){
 			const user = await User.findOne({email:email,password:password});
   // create token         
const token = jwt.sign({userId:user._id},"thisismyscreatkey",{expiresIn:'50d'});
const updateUser_data= await User.findOneAndUpdate({email:email,password:password},{$set:{token:token}},     
{new:true});
       const profile=await updateUser_data.save();

 			if(user != null){
 			    res.status(200).json({
                    result:"true",message:'user sucessfully login..',
                    data:updateUser_data
                });
            }else{
                res.status(400).json({
                    result:"false",message:'please enter correct email & password..'
                });
            }
        }else{
           res.status(400).json({
            result:"false",
            message:'parameter required email & password..'
        });	
        }        
 	}catch(error){
 	    console.log(error.message)
 	}
};


//create user logout api
const logout_api=async(req,res)=>{
    const {userId} =req.body;

    try{
        if(userId){ 
        const aa=null;        
const updateUser_data= await User.findOneAndUpdate({"_id":userId},{$set:{token:aa}},     
{new:true});
       const profile=await updateUser_data.save();
    
                res.status(200).json({
                    result:"true",message:'user  logout sucessfully ..',
                    data:updateUser_data
                });
            }else{
                res.status(400).json({
                    result:"false",message:'parameter required userId'
                });
            }
        
    }catch(error){
       res.status(400).json({
                    result:"false",message:error.message
                });
    }

};








//create mobile otp varification api
const otpvarification=async(req,res)=>{
    const {otp,userId,}=req.body;
    try{
        if(userId && otp){
        const userdata=await User.findOne({"_id":userId,"otp":otp});
        if(userdata){
            res.status(200).json({result:"true",message:"your are registered sucessfully",data:userdata});
        }else{
            res.send("please check your phone number and otp");
        }
}else{
    res.status(400).json({result:"false",message:"required parameters are userId and otp"});
}
    }catch(error){
        res.status(400).json({result:"false",message:error.message});
    }


};



// create user profile update api
const UserProfile=async(req,res)=>{
    const {userId}=req.body;
    try{
    const user_profile= await User.findOne({"_id":userId});
    if(user_profile){
        if(req.file){
            var profileRecord={
        userId:req.body.userId,
        image:req.file.filename
    }

   }else{
var profileRecord={
       userId:req.body.userId,
        
    }
   }
 const updateUser_data= await User.findOneAndUpdate({"_id":req.body.userId},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.send({result:"true", message: "user profile updated successfully.",
   path:"http://103.104.74.215:3018/uploads/",data:profile}) 
    
    }else{
         res.status(400).json({result:"false",message:"parameter required userId and image"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



//create userdata update api
const UpdateuserData=async(req,res)=>{
    const{userId,fname,lname,email,phone,address1,address2,city,pincode,gender,dob}=req.body;
    try{
    const user_profile= await User.findOne({"_id":userId});
    if(user_profile){     
var profileRecord={
     fname:fname,
     lname:lname,
     email:email,
     phone:phone,
     address1:address1,
     address2:address2,
     city:city,
     pincode:pincode,
     gender:gender,
     dob:dob
        
    }
   
 const updateUser_data= await User.findOneAndUpdate({"_id":req.body.userId},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.send({result:"true", message: "user data updated successfully.",
   path:"http://103.104.74.215:3018/uploads/",data:profile}) 
    
    }else{
         res.status(400).json({result:"false",message:"parameter required userId "});
    }
        
    }catch(error){
        
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}
};





// creaate getuser_api 
const Getuser_api=async(req,res)=>{
    const{userId}=req.body;
    try{
        const data =await User.findOne({"_id":userId});
        res.send({result:"true", message: "user data are",
        path:"http://103.104.74.215:3018/uploads/",data:data}) 
    }
    catch(error){     
    res.status(400).json({result:"false",message:" get some error",message:error.message})
}

};





// create user google login api
const GooleLogin=async(req,res)=>{
const {google_id,name,email}=req.body;
    try{
        let existingUser = await User.findOne({ google_id:google_id});
        if(google_id && name && email){
            let existingUser = await User.findOne({ google_id:google_id});
            if (!existingUser) {
                const newUser = new User({
                      google_id:google_id,
                      name:name,
                      email:email,
                     
 
});
       const user = await newUser.save();
       res.status(200).json({
        result:"true",
        message:"You are login sucessfully",
        data:user
    })
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required google_id,name,email"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({
                result:"false",
                message:"You are not login",
                message:error.message
        })
    }
 };






// create user facebook login api
const FacebookLogin=async(req,res)=>{
const {facebook_id,name,email}=req.body;
    try{
        let existingUser = await User.findOne({ facebook_id:facebook_id});
        if(facebook_id && name && email){
            let existingUser = await User.findOne({ facebook_id:facebook_id});
            if (!existingUser) {
                const newUser = new User({
                    facebook_id:facebook_id,
                      name:name,
                      email:email,
                     
 
});
       const user = await newUser.save();
       res.status(200).json({
        result:"true",
        message:"You are login sucessfully",
        data:user
    })
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required facebook_id,name,email"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({
                result:"false",
                message:"You are not login",
                message:error.message
        })
    }
 };



//create reset password api  through mobile 
 const resetPassword=async(req,res)=>{
    const {userId,phone}=req.body;
    try{
        if(phone && userId){
                  function generatePassword() {
        var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
      return retVal;
    }
    var password = generatePassword();
    
    const validation=await User.findOne({"_id":userId,"phone":phone});
         if(validation) {  
    const data =await User.findOneAndUpdate({"_id":userId,"phone":phone},{$set:{password:password},new:true});
    const userdata = await data.save();

    const dinu=await User.findOne({"_id":userId});
     res.status(200).json({
        result:"true",
        message:"generate new password sucessfully",
        data:dinu
    })


}else{
return res.send("your phone number is wrong,please enter correct phone number")
}
}else{
    return res.send("required parameters are userId and phone number")
}
    }catch(error){
        res.status(400).json({result:"false",message:error.message})
    }
};



// create change userPassword api
const changePassword=async(req,res)=>{
    try{
        const {email,userId,password}=req.body;
        if(email && userId){
         const validation=await User.findOne({"_id":userId,"email":email});
         if(validation) {  
        const data=await User.findOneAndUpdate({"_id":userId,"email":email},{$set:{password}},{new:true});
        const raja=await data.save();
        res.status(200).json({result:"true",message:"data updated successfully",data:raja});
}else{
    return res.send("your email address is wrong")
   
}
}else{
    return res.status(400).json({result:"false",message:"required parameters are userId ,email,password"});
}

    }catch(error){
        res.status(400).json({result:"false",message:error.message});
    }

};




// create faq list api for app side
 const Category_List=async(req,res)=>{
   try{
    const data= await Category.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};






//  create about list api for app side
 const Banner_List=async(req,res)=>{
   try{
    const data= await Banner.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create about list api for app side
 const Pollicy_List=async(req,res)=>{
   try{
    const data= await Pollicy.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create ProductList_api list api for app side
 const ProductList_api=async(req,res)=>{
   try{
   // const data= await Product.find({}).populate('productId');
   /* const ram=await Like.find({});
    
     const dinu= await Product.find({});
     const data=[...ram,...dinu];
*/
// const data= await Product.aggregate([ 
   
//     {
//       $lookup: {
//         from: "likes",// usermodels
//         localField: "_id",// requset ref models
//         foreignField: "productId",// generate userid
//         as: "productId" //open youe data,
//       }
//     },
    
  /* {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$productId", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { productId: 0 } }*/

    
   // ]);




/*'$lookup': {
                  //searching collection name
                  'from': 'products',
                  //setting variable [searchId] where your string converted to ObjectId
                  'let': {"searchId": {$toObjectId: "$vehicule_id"}}, 
                  //search query with our [searchId] value
                  "pipeline":[
                    //searching [searchId] value equals your field [_id]
                    {"$match": {"$expr":[ {"_id": "$$searchId"}]}},
                    //projecting only fields you reaaly need, otherwise you will store all - huge data loads
                    {"$project":{"_id": 1}}

                  ],

                  'as': 'productInfo'

                }

            },
*/






const data= await Product.aggregate( [
   {
      $lookup: {
         from: "likes",
         localField: "_id",
         foreignField: "productId",
         as: "likes",

            
      }
   },


   /*{ $match: {status:1} },
{ $project: { _id:0 } },*/

] )














    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



// create productlist on category basis
 const CategoryProductList_api=async(req,res)=>{
   const {categoryId}=req.body;
    try{
        if(!categoryId){
            res.status(400).json({result:"false",message:"parameter required categoryId"});
            }else{ 
    const products= await Product.find({"category_id":categoryId});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3018/uploads/",data:products}) 
   } 
    }catch(error){
     
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




//create address update api 
 const AddressUpdate= async(req,res)=>{
    try{
         const addressData={userId,address,pincode,city,addressId,land_Mark}=req.body;
    if(userId && address && pincode && city && addressId){
       const location=await Location.findOne({"userId":userId,"_id":addressId});
       if(location) {
   const Address_data= await  Location.findOneAndUpdate({userId:req.body.userId},{$set:{address,pincode,city,land_Mark,
    /*geo_location:{
            type:"Point",
        coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.lettitude)]
    }*/
}},
{new:true});
     res.status(200).json({result:"true", message: "Delevery address updated successfully.",data:Address_data })
       
    }else{
        res.status(400).json({result:"false",message:"userId and addressId are not match"});

    }
     }else{
        res.status(400).json({result:"false",message:"required parameters are userId,address,pincode,city,addressId"})

   }

 }catch(error){
    res.status(400).json({result:"false",message:"got some error", message:error.message});
 }
};



//create address add api 
 const Address= async(req,res)=>{
    try{
         const addressData={userId,address,pincode,city,land_Mark}=req.body;
    if(userId && address && pincode && city){

        const addressLocation =new Location({
            userId,address,pincode,city,land_Mark,/*geo_location:{
            type:"Point",
           coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.lettitude)]
    }*/
  });
        const user_location_data = await addressLocation .save();
        res.status(200).json({result:"true",message:"address location insert sucessfully",data:user_location_data});

     }
   else{res.status(400).json({result:"false",message:"required parameters are userId,address,pincode,city"})
}
 }catch(error){
    res.status(400).json({result:"false",message:"got some error", message:error.message});
 }
};


// create address list api
const Address_list=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(!userId){
            res.status(400).json({result:"false",message:"userId is required"})

        }else{
            const datalist=await Location.find({"userId":userId}).sort({"createdAt":-1}).limit(10);
            res.status(200).json({result:"true",message:"requred data here",data:datalist})
        }

    }catch(error){
        res.status(400).json({result:"false",message:error.message})
    }

};



// create address delete api
const Address_delete=async(req,res)=>{
    const {userId,addressId}=req.body;
    try{
        if(userId && addressId){
            const data =await Location.findOneAndDelete({"userId":userId,"_id":addressId});
            res.status(200).json({result:"ture",message:"data deleted successfully",data:data})

        }else{
            res.status(400).json({result:"false",message:"required parameters are userId and addressId"});
        }
    }catch(error){
        res.status(400).json({result:"false",message:error.message});

    }

};




//create likeUser
const like_api=async(req,res)=>{
    const{userId,productId,status}=req.body;
    if(userId && productId){
    try{

        const dinu=await Like.findOne({"userId":userId,"productId":productId});
        if(dinu){
            const dinudata=await Like.findOneAndUpdate({"productId":productId},{$set:{status}},{new:true});
            const updatedata=await dinudata.save();
            res.status(200).json({result:"true",message:"data updated successfully",data:updatedata})

        }
            
       
        else{

            const like= new Like({userId,productId,status});
            const likedata=await like.save();
            res.status(200).json({result:"true",message:"data add sucessfully",data:likedata});
          
    }  
        }catch(error){
            res.status(500).json(error.message);

        }
    }else{
        res.status(403).json("require parameter userId and productId,status");
    }

};




//create wish list api
 const Wishlist_api=async(req,res)=>{
   try{
    const {userId}=req.body;
    if(userId){
    const data= await Like.find({$and:[{"userId":userId},{"status":1}]}).populate('productId');
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" required parameter is userId"
        })
    }
}else{
    res.status(400).send({result:"false",message:"required parameters are userId"});
}
    
    }catch(error){
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};






// create search api
const ProductSearchApi=async(req,res)=>{
    try{
      const {key} =req.body;
      if(!key){
        res.status(400).json({result:"false",message:" required parameter is key",}) 
      }else{
      const data_name=await Product.find(
               
    {"$or":[
    {"product_name":{$regex:".*"+key+".*",$options:"i"}},
      {"price":{$regex:".*"+key+".*",$options:"i"}} 
      ]}
    )    
//check condition
    if(data_name.length>0){
        res.status(200).send({
        result:"true",
        message:"your result are",
        path:"http://103.104.74.215:3018/uploads/",
        data:data_name
    });
      }else{
           res.status(400).send({
            result:"false",
            message:"result is not found",
            data:data_name
        })  
    }
 }
}catch(error){
            res.status(400).send({result:"false",message:error.message});
        }
        };
    



// create product Details api
const ProductDetails=async(req,res)=>{
    const {productId}=req.body;
    try{
        if(!productId){
            res.status(400).json({result:"false",message:"parameter required productId"});
            }else{ 
    const products= await Product.findOne({"_id":productId});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3018/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};





//create order summery api
const ordersummery=async(req,res)=>{
    const {total_price,cartId,userId,productId}=req.body;
    try{
        if(userId){
            const raju=await Order_summery.findOne({"userId":userId});
            if(raju){
                const lakhan=await Order_summery.findOneAndUpdate({"userId":userId,"cartId":cartId},{$set:{total_price,productId}},{new:true});
                const updatedata=await lakhan.save();
                res.status(200).json({result:"true",message:"data updated successfully",data:updatedata});
            }else{
            
        const data=new Order_summery({total_price,cartId,userId,productId});
        const raja=await data.save();
        res.status(200).json({result:"true",message:"data add sucessfully",data:raja})
    }
}else{
    return res.send("required parameters are total_price,cartId,userId,productId")
}
    }catch(error){
        res.status(400).json({result:"false",message:error.message});
    }

};




//
const ordersummery_list=async(req,res)=>{
     try{
         const {cartId}=req.body;
         
        if(!cartId ){
            res.status(400).json({result:"false",message:"required parameter is cartId,productId,userId "})
        }else{

        const list=await Order_summery.find({"cartId":cartId}).populate('productId').populate('userId').populate('cartId');
        res.status(200).json({result:"true",message:"your list are",
            path:"http://103.104.74.215:3008/uploads/",
            data:list})
}
    }catch(error){
         res.status(400).send({result:"false",message:"get some error", msg:error.message});

    }


};





// create oder product api
const OrderProduct=async(req,res)=>{
    try{
    const{userId,shippingAddressId,status,total_price,text}=req.body;
    if(userId && shippingAddressId && total_price){
    const order=new Order({userId,shippingAddressId,status,total_price,text});
    const data= await order.save();
    res.status(200).json({result:"true",message:"data insert sucessfully",data:data});
}else{
    res.send("required parameters are userId,shippingAddressId,total_price");
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});

}

};


//create order history api
const orderhistory=async(req,res)=>{
    const{userId,shippingAddressId}=req.body;
    try{
        if(userId){
    //const data=await Order.find({"userId":userId});
             const data=await Order.aggregate([
   
    {
      $lookup: {
        from: "carts",// usermodels
        localField: "userId",// requset ref models
        foreignField: "userId",// generate userid
        as: "userId" //open youe data
      }
    },
   

    ]);
             console.log(data[0].userId.productId)
    res.status(200).json({result:"true",message:"required list are",data:data});
}else{
    res.status(400).json({result:"false",message:"required parameter is userId"});
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};



// create order details api
const orderDetails=async(req,res)=>{
    const{userId,orderId}=req.body;
    try{
        if(userId && orderId){
    const data=await Order.findOne({"userId":userId,"_id":orderId}).populate('_id');
    res.status(200).json({result:"true",message:"required list are",data:data});
}else{
    res.status(400).json({result:"false",message:"data does not found"});
}
}catch(error){
    res.status(400).json({result:"false",message:error.message});

 }
};




// create  add  cart api 
const AddCart_api=async(req,res)=>{
    const {userId,productId,gst,delevery_charge,prices,color,size,duration,status}=req.body;
    
try{
    const Rauniyar=await Cart.findOne({"userId":userId,"productId":productId});
    if(Rauniyar){
         res.status(400).send({result:"false",message:"productId exist"});
}else{

if(userId && productId ){
    const product=new Cart({userId,productId,gst,delevery_charge,prices,color,size,duration,status});
    
    const result=await product.save();
    res.status(200).json({result:"true",message:"data add sucessfully",data:result});
}else{
    res.status(400).send({result:"false",message:"required parameters are userId,productId,gst,delevery_charge,duration,color"});
  }
}
    }catch(error){
        res.status(400).send({result:"false",message:"get some error", msg:error.message});
    }

};






// create delete or remove add cart api
 const cartDelete=async(req,res)=>{
    const{cartId}=req.body;
          
try{ 
if(cartId){         
    const data =await Cart.findByIdAndDelete({"_id":cartId});           
    if(data.length==0){
        res.status(400).json({result:"false",message:"record not found"});
    }else{
     res.status(200).json({result:"true", message: "list deleted successful", data:data});
    }
  
}else{
    res.status(400).send({result:"false",message:"required parameters are cartId "});
}
 }catch(error){
          res.send(error.message)
      }
    };




// create  cart list api
const cartlist =async(req,res)=>{
    
    try{
         const {userId}=req.body;
         
        if(!userId ){
            res.status(400).json({result:"false",message:"required parameter is userId "})
        }else{

        const list=await Cart.find({"userId":userId}).populate('productId');
        res.status(200).json({result:"true",message:"your list are",
            path:"http://103.104.74.215:3018/uploads/",
            data:list})
}
    }catch(error){
         res.status(400).send({result:"false",message:"get some error", msg:error.message});

    }
};



//creat user details api
const UserDetails=async(req,res)=>{
    const {userId}=req.body;
    try{
        if(!userId){
            res.status(400).json({result:"false",message:"parameter required userId"});
            }else{ 
    const products= await User.findOne({"_id":userId});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3018/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};






//  create about list api for app side
 const About_List=async(req,res)=>{
   try{
    const data= await About.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



// create faq list api for app side
 const Faq_List=async(req,res)=>{
   try{
    const data= await Faq.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};





// create faq list api for app side
 const Term_List=async(req,res)=>{
   try{
    const data= await Term.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create city list api for app side
 const Feature_api=async(req,res)=>{
   try{
    const data= await Feature.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};




//  create about list api for app side
 const Shipping_List=async(req,res)=>{
   try{
    const data= await Shipping_pollicy.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create about list api for app side
 const Return_List=async(req,res)=>{
   try{
    const data= await Return_pollicy.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};



//  create about list api for app side
 const Refferal_List=async(req,res)=>{
   try{
    const data= await Refferal_term.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};








//  create rent pollicy list api for app side
 const rentbenifit_List=async(req,res)=>{
   try{
    const data= await Rent_benifit.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};















//  create contact us list api for app side
 const Contact_List=async(req,res)=>{
   try{
    const data= await Contact.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};






//  create city list api for app side
 const City_List=async(req,res)=>{
   try{
    const data= await City_list.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};







//  create Feedback_api list api for app side
 const Feedback_api=async(req,res)=>{
   try{
    const data= await Feedback.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};





//  create OfferList_api list api for app side
 const OfferList_api=async(req,res)=>{
   try{
    const data= await Offer.find();
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3018/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};
















// create user twiter login api

const TwiterLogin=async(req,res)=>{
const {twiter_id,name,email}=req.body;
    try{
        let existingUser = await User.findOne({ twiter_id:twiter_id});
        if(twiter_id && name && email){
            let existingUser = await User.findOne({ twiter_id:twiter_id});
            if (!existingUser) {
                const newUser = new User({
                      twiter_id:twiter_id,
                      name:name,
                      email:email,
                     
 
});
       const user = await newUser.save();
       res.status(200).json({
        result:"true",
        message:"You are login sucessfully",
        data:user
    })
}else{
res.send({result:"false",message:"You are allready login"})
}
            }else{
                res.send({result:"false",message:"parameter required twiter_id,name,email"});
            }

        }
        catch(error){
            console.log(error.message)
            res.status(400).json({
                result:"false",
                message:"You are not login",
                message:error.message
        })
    }
 };




//  create Recet Buy ProductList_api list api for app side
 const RecentBuyProductList_api=async(req,res)=>{
   try{
    const data= await Product.find({product_type:"Buy"}).sort( { createdAt: -1 } ).limit(10);
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};





//  create  Recent Rent ProductList_api list api for app side
 const recentRentProductList_api=async(req,res)=>{
   try{
    const data= await Product.find({product_type:"Rent"}).sort( { createdAt: -1 } ).limit(10);
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};







// create sort productname on category base api list
const SortProduct_list=async(req,res)=>{
    const {product_name}=req.body;
    try{
         
    const products= await Product.find({}).sort({"product_name":1});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   
    }catch(error){
       
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};




// create sort productname on category base api list
const SortProductDsc_list=async(req,res)=>{
    const {product_name}=req.body;
    try{
        
    const products= await Product.find({}).sort({"product_name":-1});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};







// create sumcategoryBuyProduct api list
const subcategoryBuyProduct_list=async(req,res)=>{
    const {subcategoryId}=req.body;
    try{
        if(!subcategoryId){
            res.status(400).json({result:"false",message:"parameter required subcategoryId"});
            }else{ 
    const products= await Product.find({"subcategory_id":subcategoryId,product_type:"Buy"});
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create sumcategoryRentProduct api list
const subcategoryRentProduct_list=async(req,res)=>{
    const {subcategoryId}=req.body;
    try{
        if(!subcategoryId){
            res.status(400).json({result:"false",message:"parameter required subcategoryId"});
            }else{ 
    const products= await Product.aggregate([
   
    {
      $lookup: {
        from: "likes",// usermodels
        localField: "status",// requset ref models
        foreignField: "productId",// generate userid
        as: "status" //open youe data
      }
    },
    

    ]);



    /*find({"subcategory_id":subcategoryId,product_type:"Rent"});*/
   res.send({result:"true", message: "your list are.",
   path:"http://103.104.74.215:3008/uploads/",data:products}) 
   } 
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};





// create sub category list api for app side
 const Sub_Category_List=async(req,res)=>{
    const {categoryId}=req.body;
   try{
    if(!categoryId){
        res.status(400).json({result:"false",message:"required parameters is categoryId"})
    }
    const data= await Sub_Category.find({"categoryId":categoryId});
    if(data != null){
        res.status(200).json({
            result:"true",
            message:"all data lists are",
            path:"http://103.104.74.215:3008/uploads/",data:data
        })
    }else{
        res.send({
            result:"false",
            message:" data does not found"
        })
    }
    
    }catch(error){
        
    res.status(400).json({
        result:"false",
        message:"data list does not found",
        message:error.message
    })
  }     
};









/*
// Payment getway api
const nodeCCAvenue = require('node-ccavenue');
const crypto = require("crypto");

const ccav ={
  merchant_id:"2240659",
  working_key:"AFBE81F999795DE72C32F0B22940EA3F",
};


const encryptedData = ccav.encrypt('Just plain text to encrypt or uri encoded order information');
console.log(encryptedData); // Proceed further

const decryptedData = ccav.decrypt(encryptedData);
console.log(decryptedData); // Proceed further


const orderParams = {
  order_id: 8765432,
  currency: 'INR',
  amount: '1.00',
  redirect_url: encodeURIComponent(`http://localhost:3020/krazeal/api/dinu`),
  billing_name: 'Name of the customer',
  
};
 
const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
console.log(encryptedOrderData); // Proceed further

// Considering this is your redirect_url
const dinesh=async(req, res) => {
  const { encResp } = req.body;
  const decryptedJsonResponse =await  ccav.redirectResponseToJson(encResp);
  // To check order_status: - 
  console.log(decryptedJsonResponse.order_status);
};








*/

















module.exports ={
User_Signup,
User_Login,
otpvarification,
UserProfile,
UpdateuserData,
Getuser_api,
GooleLogin,
FacebookLogin,
resetPassword,
changePassword,
Category_List,
Banner_List,
Pollicy_List,
ProductList_api,
CategoryProductList_api,
Address,
Address_list,
Address_delete,
AddressUpdate,
like_api,
Wishlist_api,
ProductSearchApi,
ProductDetails,
OrderProduct,
orderhistory,
orderDetails,
ordersummery,
ordersummery_list,
AddCart_api,
cartlist,
cartDelete,
UserDetails,





About_List,
Faq_List,
Term_List,
Feature_api,
Shipping_List,
Refferal_List,
Return_List,
rentbenifit_List,


Contact_List,
Feedback_api,
OfferList_api,
City_List,



TwiterLogin,
RecentBuyProductList_api,
recentRentProductList_api,
Sub_Category_List,
subcategoryBuyProduct_list,
subcategoryRentProduct_list,
SortProduct_list,
SortProductDsc_list,
logout_api,
/*dinesh*/

};