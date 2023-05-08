
// import dependancies and models in controllers js files
const Product=require("../models/product_models");
const Category=require("../models/category_models");
const Banner=require("../models/banner_models");
const Offer=require("../models/offer_models");
const City_list=require("../models/city_list_models");
const Contact=require("../models/contact_us_models");
const About=require("../models/about_us_models");
const Term=require("../models/term_models");
const Pollicy=require("../models/p_pollicy_models");
const Faq=require("../models/faq_models");
const Feature=require("../models/our_features_models");
const Feedback=require("../models/feedback_models");
const Return_pollicy=require("../models/return_pollicy_models");
const Shipping_pollicy=require("../models/shipping_pollicy_models");
const Refferal_term=require("../models/refferal_term_models");
const User=require("../models/user_models");
const Sub_Category=require("../models/sub_category_models");
const Rent_benifit=require("../models/rent_benifit_models");
const Order=require("../models/order_product_models");





// create product add api 
const Product_api=async(req,res)=>{
    const {product_name,category_name,price,sale_price,discount_percantage,refund_pollicy,
                 category_id,instock,weight,height,width,length,description}=req.body;
try{


 const arrayImage=["front","right","left","back","about"];
 for(let i=0;i<req.files.length;i++){
    arrayImage[i]=req.files[i].filename;
 }

const colors=["red","blue","black","white","pink","gray"];
const sizes=["single","double","queen size","king size","five","four"];

const a=Number(price);
const b=Number(sale_price);
const x=Number(a-b);
const xx=Math.round(Number((x*100)/a));



const product=new Product({product_name,category_name,price,sale_price,discount_percantage:xx,refund_pollicy,
                               color:colors,size:sizes,category_id,instock,
                               weight,images:arrayImage,height,width,length,description});
    


    const result=await product.save();
    res.status(200).redirect("/public/product_list");/*.json({result:"true",message:"data add sucessfully",data:result});*/
    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};




// start create category api
const Category_api=async(req,res)=>{
    try{
         const {name}=req.body;
         const user_profile= await Category.findOne({name:name});
          if(user_profile){
        if(req.file){
            var profileRecord={
            name:name,
            image:req.file.filename
    }

   }else{
var profileRecord={
      name:name
    }
   }
 const updateUser_data= await Category.findOneAndUpdate({name:name},(profileRecord),      
{new:true}); 
   res.status(200).redirect("/public/category");/*json({
   result:"true",
   message: "data updated successfully.",
   data:updateUser_data
})*/

}else{
const category=new Category({name:name,image:req.file.filename});
             if(name){
            const result = await category.save();
             res.status(200).redirect("/public/category");/*json({
                result:"true",
                message:"add sucessfully",
                data:result
             });*/
 
  }else{ 
     res.status(400).json({result:"false",message:"required parameters name,image"})
  }
 }
}catch(error){
            res.status(500).send({result:"false",message:"get some error", msg:error.message});
        }
};




// create banner post api
const Banner_api =async(req,res)=>{
    const {title}=req.body;
    try{
    const category=new Banner({title:title,image:req.file.filename});
            const result = await category.save();
             res.status(200).redirect("/public/banner_list");/*json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    */

    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};





// create  offer list api post api
const Offer_api =async(req,res)=>{
    const {title,text,ex_date}=req.body;
    try{

    var OTP = Math.floor(1000 + Math.random() * 9000);
    const  create_data=new Offer({title,text,ex_date,code:OTP,image:req.file.filename});
            const result = await create_data.save();
             res.status(200).redirect("/public/offer_list");/*json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    */

    }catch(error){
        res.status(500).render("create_offer",{result:"false",message:"get some error", msg:error.message});
    }

};





// create city list post api
const Create_city_list =async(req,res)=>{
    const {city}=req.body;
    try{
    const citylist=new City_list ({city:city,image:req.file.filename});
            const result = await citylist.save();
             res.status(200).json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    

    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};






// create contact us api using post method
const Contact_Us=async(req,res)=>{
    
    const {whatsapp,email_address}=req.body;
    // exist user
    const register_user= await Contact.findOne({email_address});
    if(register_user){
     res.status(400).json({
        result:"false",
        message:"user allready send data",  
    });

    }else{
        if(whatsapp && email_address ){

        try{
            const user = new Contact({whatsapp,email_address})
            const user_data=await user.save()
            res.status(200).json({
                result:"true",
                message:"contact us details are",data:user_data});
        }catch(error){
            res.status(400).json({result:"false",
                message:"data doest not send"
            })
        }
    }else{
        res.status(400).json({
            result:"false",
            message:"parameter required whatsapp, email_address "
        });
    }
}
};




//create privacy Policy post api
 const Privacy_Pollicy =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Pollicy({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};




// create term and condiction api
//create privacy Policy post api
 const Term_Condiction =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Term({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};





//create about us post api
 const About_Us =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new About({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};




// create faq api
 const Faqs=async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Faq({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};





//create our_features api
const Features_api=async(req,res)=>{
    const {title,text,type}=req.body;
    try{
        const feautres_data=new Feature({title,text,type})
        const result=await feautres_data.save();
        res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
  }
};







// create sub category post api
const feedback_api =async(req,res)=>{
    const {title,text}=req.body;
    try{
    const category=new Feedback({title,text,image:req.file.filename});
            const result = await category.save();
             res.status(200).json({
                result:"true",
                message:"add sucessfully",
                data:result
             });    

    }catch(error){
        res.status(500).send({result:"false",message:"get some error", msg:error.message});
    }

};




//create return Policy post api
 const return_Pollicy =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Return_pollicy({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};





//create Shipping Policy post api
 const Shippingpollicy =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Shipping_pollicy({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};



//create Refferalterm Policy post api
 const Refferalterm =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Refferal_term({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};



//create rent benifit Policy post api
 const RentBenifit =async(req,res)=>{
   const{title,text}=req.body;  
    if(text && title){
 try{
                    
        const user=new Rent_benifit({title,text})
        const result=await user.save()
         res.status(200).json({
            result:"true",
            message:"data add sucessfully",
            data:result
  })
    } catch(error){
        console.log(error.message)
        res.status(400).json({result:"false",
            message:" get some error",
            message:error.message
        })
     }
      }else{
     res.send({result:"false",message:"parameter required text,title "});
   }
};




//create indexpage api
const IndexPage=async(req,res)=>{
    const usercount=await User.count();
    const a={usercount};
    const productcount=await Product.count();
    const b={productcount};
    const categorycount=await Category.count();
    const c={categorycount};
    const subcategorycount=await Order.count();
    const d={subcategorycount};
    const data=[a,b,c,d];

	res.render("index",{data:data});

}



// create admin login page
const LoginPage=async(req,res)=>{
	res.render("login");
}


// category Operations
//create indexpage api
const CategoryPage=async(req,res)=>{
	res.render("create_category");
}


//  create category list api
const categorylist=async(req,res)=>{
try{
    const data = await Category.find();
    if(data != null){
        res.status(200).render("game_category",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};


// create delete category api

    const categoryDelete=async(req,res)=>{
    	const id=req.params.id  
try{           
    const data =await Category.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('game_category',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/Category');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };



//create update category api
   const CategoryUpdate=async(req,res)=>{
   try {
    const id=req.params._id;
   if(req.file){
    var datarecord={
        name:req.body.name,
        image:req.file.filename
    }

   }else{
var datarecord={
        name:req.body.name
       
    }
   }
   var list=await Category.findByIdAndUpdate(id,(datarecord),function(err){
    if(err){
        res.redirect('category_update/',+req.params._id);
    }else{
        res.status(200).redirect('/public/Category');
    }
   });
   
}catch(error){
console.log(error.message);
}
  };
   




// create category update api list
const categoryupdate=(req,res,next)=>{
 Category.findById(req.params._id).then(result =>{
        res.status(200).render('edit_category',{data:result})
    })
.catch(error =>{
    res.status(500).json({ error:error})
})
  };


 //end category operation





// start subcategory operation
//create supcategorypage api
const SubCategoryPage=async(req,res)=>{
   try{
    const data = await Category.find();
    if(data != null){
        res.status(200).render("create_subcategory",{result:"true",message:"all data lists are",data:data})
        //console.log(data)
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};




//  create category list api
const subcategorylist=async(req,res)=>{
try{
    const data = await Sub_Category.find();
    if(data != null){
        res.status(200).render("subcategory",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};


// create delete category api

    const subcategoryDelete=async(req,res)=>{
        const id=req.params.id  
try{           
    const data =await Sub_Category.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('game_category',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/subcategory');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };



// create subcategroy update api
const SubcategoryUpdate=async(req,res)=>{
    const id=req.params.id;
    
    try{
    const user_profile= await Sub_Category.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        name:req.body.name,
        categoryId:req.body.categoryId,
        image:req.file.filename
    }

   }else{
var profileRecord={
       id:req.params._id,
        name:req.body.name,
        
    }
   }
 const updateUser_data= await Sub_Category.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/subcategory");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create banner update api list
const subcategoryupdate=async(req,res)=>{
    try{
       //const results= await Category.find();  
    const result= await Sub_Category.findById(req.params.id);
    
    //console.log(result)
    res.status(200).render('edit_subcategory',{data:result});

    }catch(error){
        res.status(400).json({ message:error.message})
    }  
  };




// end subcategory operation here





// Banner Operations
// create banner list api
const bannerlist=async(req,res)=>{
try{
    const data = await Banner.find();
    if(data != null){
        res.status(200).render("banner",{result:"true",message:"all data lists are",data:data})
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};



// create banner update api
const BannerUpdate=async(req,res)=>{
    const id=req.params.id;
    
    try{
    const user_profile= await Banner.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        name:req.body.name,
        title:req.body.title,
        image:req.file.filename
    }

   }else{
var profileRecord={
       id:req.params._id,
      title:req.body.title,
        
    }
   }
 const updateUser_data= await Banner.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/banner_list");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create banner update api list
const bannerupdate=async(req,res,next)=>{
 Banner.findById(req.params.id).then(result =>{
        res.status(200).render('edit_banner',{data:result})
    })
.catch(error =>{
    res.status(500).json({ error:error})
})
  };


//create indexpage api
const BannerPage=async(req,res)=>{
	res.render("create_banner");
}




  //create banner delete method by using delete method
    const BannerDelete=async(req,res)=>{
    	const id=req.params.id  
try{           
    const data =await Banner.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('banner_list',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/banner_list');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };






// Offer operations
//create offer banner list 
   const Offer_list =async(req,res)=>{
       try{                
       const ff =await Offer.find()           
       return res.status(200).render('offer_banner',{ result: "true", message: "list are", data:ff 
  });

}  catch(error){
    res.status(400).json({result:"false",message:error.message});
       
   }
 };




// create banner update api
const offerUpdate=async(req,res)=>{
    const id=req.params.id;
    
    try{
    const user_profile= await Offer.findOne({"_id":id});
    if(user_profile){
        if(req.file){
            var profileRecord={
        text:req.body.text,
        title:req.body.title,
         ex_date:req.body.ex_date,
        image:req.file.filename
    }

   }else{
var profileRecord={
       id:req.params._id,
      text:req.body.text,
      title:req.body.title,
     ex_date:req.body.ex_date,
        
    }
   }
 const updateUser_data= await Offer.findOneAndUpdate({"_id":id},(profileRecord),     
{new:true});
       const profile=await updateUser_data.save();
   res.status(200).redirect("/public/offer_list");/*({result:"true", message: "user profile updated successfully.",data:profile})  */
    
    }else{
         res.status(400).json({result:"false",message:"parameter required id"});
    }
        
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:"false",message:" get some error",msg:error.message})
}

};



// create banner update api list
const OFFERupdate=async(req,res)=>{
  try{
    const id=req.params.id;
       
    const data= await Offer.findById({"_id":id});
    res.render('Edit_offer',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
  };


//create indexpage api
const OfferPage=async(req,res)=>{
    res.render("create_offer");
}




  //create banner delete method by using delete method
    const offerDelete=async(req,res)=>{
        const id=req.params.id  
try{           
    const data =await Offer.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('offer_banner',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/offer_list');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };


// offer operation close here



// City_list operations

//create  City_list list 
   const City_List =async(req,res)=>{
       try{                
       const list =await City_list.find()           
       return res.status(200).render('city_list',{ result: "true", message: "list are", list:list 
  });

}  catch(error){
    res.status(400).json({result:"false",message:error.message});
       
   }
 };



// create city update api
 const updateCity=async(req,res)=>{  
try {
    const id=req.params._id;
   if(req.file){
    var datarecord={
        city:req.body.city,
        image:req.file.filename
    }

   }else{
var datarecord={
        city:req.body.city
       
    }
   }
   var list=await City_list.findByIdAndUpdate(id,(datarecord),function(err){
    if(err){
        res.redirect('city_update/',+req.params._id);
    }else{
        res.status(200).redirect('/public/city_list');
    }
   });
   
}catch(error){

}
  };
   

// find id by usede gate method
const UpdateCity=async(req,res) =>{
    const id=req.params._id;
  const aa =City_list.findById(id,(err,user) =>{
    if(err){
        res.redirect("/public/city_list");
    }else{
        if(user == null){
            res.redirect("/public/city_list");
        }else{
        res.status(200).render('city_edit',{list:user})
        }
       }
     })
   };


  //create city delete method by using delete method
    const cityDelete=async(req,res)=>{
        const id=req.params._id  
try{           
    const list =await City_List.findByIdAndDelete({"_id":id});           
     res.status(200).redirect('/public/city_list');/*{ success: true, message: "list deleted successful", list: list}) */
    
  }
 catch(error){
          res.send(error.message)
      }
    };





//create Admin signin api
const AdminSignin=async(req,res)=>{
     try{
      const {email,password}=req.body;
      const user= await User.findOne({email:email,password:password});
      if (user) {
    if(user.is_user === 0){
        res.render("login",{message:"email and Password incorrect"});
    }else{
        req.session.user_id=user._id;
        console.log(req.session)
        res.redirect('/public/index');
    }
  }
      else{
  res.render('login',{message:"email and Password incorrect"});

 }
   
   }catch(error){
           console.log(error.message)
    }  

};



// create user logout api
 const AdminLogout=async(req,res) => {
    req.session.destroy();
    res.render('login');
};



// product operations start
// create product list api
const productlist=async(req,res)=>{
try{
    const data = await Product.find().populate('category_id');
 
    if(data != null){
        res.status(200).render("product_list",{result:"true",message:"all data lists are",data:data})
        console.log(data)
    }else{
        res.status(400).json({result:"false",message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:"false",message:"get some error",msg:error.message})
  }     

};


//Product indexpage api
const ProductPage=async(req,res)=>{
    try{
        const dinesh=await Category.find();
        res.status(200).render("product",{result:"true",data:dinesh});
    }catch(error){
        res.status(400).json({result:"false",message:error.message})

    }
 }



  //create product delete method by using delete method
    const productDelete=async(req,res)=>{
        const id=req.params.id;  

try{           
    const data =await Product.findByIdAndDelete({"_id":id});           
    if(data.length==0){
        res.status(400).render('product_list',{msg:'Record not found'})
    }else{
     res.status(200).redirect('/public/product_list');/*{ success: true, message: "list deleted successful", list: list}) */
    }
  }
 catch(error){
          res.send(error.message)
      }
    };



// product update api
    const updateproducts=async(req,res)=>{
        try{
        
    const result= await Product.findById(req.params.id);
    res.status(200).render('edit_product',{data:result});

    }catch(error){
        res.status(400).json({ message:error.message})
    }  

    };


// product updates using post method
    const UpdateProducts=async(req,res)=>{
        const id=req.params.id;
        try{


         const arrayImage=[];
        for(let i=0;i<req.files.length;i++){
          arrayImage[i]=req.files[i].filename;
      }


 const{product_name,product_type,title,text,rent_price,price,discount_price,rent_discount_price,delevery_time,refund_pollicy,
                instock,dimensions,type_product,type_of_finish,like,offer,height,width,length,description}=req.body;
            const dinesh=await Product.findOne({"_id":id});
            if(dinesh){
                if(req.file){
                    var datarecord={

                        product_name:product_name,
                        product_type:product_type,
                        title:title,
                        text:text,
                        rent_price:rent_price,
                        price:price,
                        discount_price:discount_price,
                        rent_discount_price:rent_discount_price,
                        delevery_time:delevery_time,
                        refund_pollicy:refund_pollicy,
                        instock:instock,
                        dimensions:dimensions,
                        type_product:type_product,
                        type_of_finish:type_of_finish,
                        offer:offer,
                        height:height,
                        width:width,
                        length: length,
                        description:description,
                        images:arrayImage
                        
                    }
                }else{
                     var datarecord={
                        product_name:product_name,
                        product_type:product_type,
                        title:title,
                        text:text,
                        rent_price:rent_price,
                        price:price,
                        discount_price:discount_price,
                        rent_discount_price:rent_discount_price,
                        delevery_time:delevery_time,
                        refund_pollicy:refund_pollicy,
                        instock:instock,
                        dimensions:dimensions,
                        type_product:type_product,
                        type_of_finish:type_of_finish,
                        offer:offer,
                        height:height,
                        width:width,
                        length: length,
                        description:description,
                }
            }
            

const data=await Product.findByIdAndUpdate({"_id":id},(datarecord),{new:true});
const dashing=await data.save();
res.status(200).redirect("/public/product_list");


        }else{
            res.status(400).json({result:"false",message:"some paramerers are required"})
        }


        }catch(error){
            res.status(400).json({result:"true",message:error.message});
        }

    };


// producyt operations end here


// start contact operation
    // create contact list api
    const contactlist=async(req,res)=>{
        try{
            const data=await Contact.find({});
            res.status(200).render("contact",{result:"true",message:'list are',data:data});
        }catch(error){
            res.status(400).json({result:"false",message:error.message});
        }

    };

// create contest update api to get method
    const updatecontact=async(req,res)=>{
         try{
        
    const data= await Contact.findById(req.params.id);
    res.status(200).render('edit_contact',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
    };


// create Update contact us api using post method
    const Updatecontact=async(req,res)=>{
        const id=req.params.id;
        const{email_address,whatsaap}=req.body;
        try{
            const data=await Contact.findByIdAndUpdate({"_id":id},{$set:{email_address,whatsaap},new:true});
         res.status(200).redirect("/public/contactList");

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
    };

    //end contact us operation here


// start user collection operations
    // create userlist api
const userList=async(req,res)=>{
    try{
    const data=await User.find();
     res.status(200).render('user_show',{data:data});
      }catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// create user details api
const UserDetail=async(req,res)=>{
    const id=req.params.id;
try{

    const data=await User.findById({"_id":id});
     res.status(200).render('user_profile',{data:data});
      }catch(error){
        res.status(400).json({ message:error.message})
     }  

};


// end user collection operations here
// start term and condiction operation api
const termlist=async(req,res)=>{
    try{
        const data=await Term.find();
       res.status(200).render('term_condiction',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updateTerm=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Term.findById({"_id":id});
     res.status(200).render('edit_term_condition',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdateTerm=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Term.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/termList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};

// end term operation here


// start pollicy operation api
const pollicylist=async(req,res)=>{
    try{
        const data=await Pollicy.find();
       res.status(200).render('privacy_pollicy',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatepollicy=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Pollicy.findById({"_id":id});
     res.status(200).render('edit_pollicy',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdatePollicy=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Pollicy.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/privacyList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};

// end Pollicy operation here



// start pollicy operation api
const aboutlist=async(req,res)=>{
    try{
        const data=await About.find();
       res.status(200).render('about',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updateabout=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await About.findById({"_id":id});
     res.status(200).render('edit_about',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdateAbout=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await About.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/aboutList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end Pollicy operation here


// start shipping pollicy operation

const shipping_pollicylist=async(req,res)=>{
    try{
        const data=await Shipping_pollicy.find();
       res.status(200).render('shipping_pollicy',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updateshipping_pollicy=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Shipping_pollicy.findById({"_id":id});
     res.status(200).render('edit_shipping',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updateshipping_pollicy=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Shipping_pollicy.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/shipping_pollicyList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end shipping pollicy operation here




// start return pollicy operation

const return_pollicylist=async(req,res)=>{
    try{
        const data=await Return_pollicy.find();
       res.status(200).render('return_pollicy',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatereturn_pollicy=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Return_pollicy.findById({"_id":id});
     res.status(200).render('edit_return',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updatereturn_pollicy=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Return_pollicy.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/return_pollicyList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end return pollicy operation here




// start faq pollicy operation

const faqlist=async(req,res)=>{
    try{
        const data=await Faq.find();
       res.status(200).render('faq',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updatefaq=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Faq.findById({"_id":id});
     res.status(200).render('edit_faq',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updatefaq=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Faq.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/faqList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end faq operation here



// start Rentifi_benifite pollicy operation

const rentBenifiteslist=async(req,res)=>{
    try{
        const data=await Rent_benifit.find();
       res.status(200).render('rentbenifites',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updaterentBenifites=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Rent_benifit.findById({"_id":id});
     res.status(200).render('edit_rentbenifites',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const UpdaterentBenifites=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Rent_benifit.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/rentBenifitesList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end Rentifi_benifite operation here



// start reffer_term  pollicy operation

const refferallist=async(req,res)=>{
    try{
        const data=await Refferal_term.find();
       res.status(200).render('refferal',{data:data});

    }catch(error){
        res.status(400).json({ message:error.message})
     }  
}


// create edit term and condiction api
const updaterefferal=async(req,res)=>{
    const id=req.params.id;
    try{
    const data=await Refferal_term.findById({"_id":id});
     res.status(200).render('edit_refferal',{data:data});
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};



// create edit term and condiction api
const Updaterefferal=async(req,res)=>{
    const {title,text}=req.body;
    const id=req.params.id;
    try{
    const data=await Refferal_term.findByIdAndUpdate({"_id":id},{$set:{title,text},new:true});
     res.status(200).redirect("/public/refferalTermList");
}catch(error){
        res.status(400).json({ message:error.message})
     }  
};


// end reffer_term operation here










// export from hers
module.exports={
    Product_api,
    Category_api,
    Banner_api,
    Offer_api,
    Create_city_list,
    Contact_Us,
    Privacy_Pollicy,
    Term_Condiction,
    About_Us,
    Faqs,
    Features_api,
    feedback_api,
    return_Pollicy,
    Shippingpollicy,
    Refferalterm,
    RentBenifit,



	IndexPage,
	LoginPage,
	CategoryPage,
	categorylist,
	categoryDelete,
	CategoryUpdate,
	categoryupdate,
	bannerlist,
	BannerUpdate,
	bannerupdate,
	BannerPage,
	BannerDelete,
    updateCity,
    UpdateCity,
    City_List,
    cityDelete,
    AdminSignin,
    AdminSignin,
    productlist,
    ProductPage,
    productDelete,
    offerUpdate,
    OFFERupdate,
    OfferPage,
    offerDelete,
    Offer_list,
    subcategorylist,
    subcategoryDelete,
    SubcategoryUpdate,
    subcategoryupdate,
    SubCategoryPage,
    updateproducts,
    UpdateProducts,
    contactlist,
    updatecontact,
    Updatecontact,
    userList,
    UserDetail,
    termlist,
    updateTerm,
    UpdateTerm,
    pollicylist,
    updatepollicy,
    UpdatePollicy,

     aboutlist,
    updateabout,
    UpdateAbout,
     shipping_pollicylist,
    updateshipping_pollicy,
    Updateshipping_pollicy,
     return_pollicylist,
    updatereturn_pollicy,
    Updatereturn_pollicy,

     faqlist,
    updatefaq,
    Updatefaq,
 rentBenifiteslist,
    updaterentBenifites,
    UpdaterentBenifites,
    refferallist,
    updaterefferal,
    Updaterefferal,













};