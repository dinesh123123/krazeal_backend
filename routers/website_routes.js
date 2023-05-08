// import dependancies in the  router files
const express=require("express");
const router=express();
const multer = require("multer");
const websiteControllers=require("../controllers/website_controllers");




// create storage
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },

});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:100000000000 //1000000 bytes=1MB
   }
});






//import user controllers files here
router.post("/signup",websiteControllers.User_Signup);
router.post("/login",websiteControllers.User_Login);
router.post("/logout",websiteControllers.logout_api);
router.post("/otp_varification",websiteControllers.otpvarification);
router.post("/user_profile",upload.single('image'),websiteControllers.UserProfile);
router.post("/update_userdata",websiteControllers.UpdateuserData);
router.post("/get_user",websiteControllers.Getuser_api);
router.post("/google_login",websiteControllers.GooleLogin);
router.post("/facebook_login",websiteControllers.FacebookLogin);
router.post("/reset_password",websiteControllers.resetPassword);
router.post("/change_password",websiteControllers.changePassword);
router.get("/banner_list",websiteControllers.Banner_List);
router.get("/category_list",websiteControllers.Category_List);
router.get("/privacy_pollicy_list",websiteControllers.Pollicy_List);
router.get("/product_list",websiteControllers.ProductList_api);
router.post("/category_product_list",websiteControllers.CategoryProductList_api);
router.post("/add_address",websiteControllers.Address);
router.post("/address_list",websiteControllers.Address_list);
router.post("/address_delete",websiteControllers.Address_delete);
router.post("/address_update",websiteControllers.AddressUpdate);
router.post("/wish_list",websiteControllers.Wishlist_api);
router.post("/search_api",websiteControllers.ProductSearchApi);
router.post("/like_api",websiteControllers.like_api);
router.post("/product_details",websiteControllers.ProductDetails);
router.post("/order",websiteControllers.OrderProduct);
router.post("/order_history",websiteControllers.orderhistory);
router.post("/order_details",websiteControllers.orderDetails);
router.post("/add_cart",upload.single('image'),websiteControllers.AddCart_api);
router.post("/cart_list",websiteControllers.cartlist);
router.post("/cart_remove",websiteControllers.cartDelete);
router.post("/user_details",websiteControllers.UserDetails);
router.post("/order_summery",websiteControllers.ordersummery);
router.post("/order_summery_list",websiteControllers.ordersummery_list);




router.get("/term_condition_list",websiteControllers.Term_List);
router.get("/faq_list",websiteControllers.Faq_List);
router.get("/about_us_list",websiteControllers.About_List);
router.get("/features_list",websiteControllers.Feature_api);
router.get("/feedback_list",websiteControllers.Feedback_api);
router.get("/return_pollicy_list",websiteControllers.Return_List);
router.get("/shipping_pollicy_list",websiteControllers.Shipping_List);
router.get("/refferal_term_list",websiteControllers.Refferal_List);
router.get("/rent_benifit_list",websiteControllers.rentbenifit_List);




router.get("/contact_us_list",websiteControllers.Contact_List);
router.get("/city_list",websiteControllers.City_List);
router.get("/offer_list",websiteControllers.OfferList_api);




router.post("/twiter_login",websiteControllers.TwiterLogin);
router.get("/recent_buyProduct_list",websiteControllers.RecentBuyProductList_api);
router.get("/recent_rentProduct_list",websiteControllers.recentRentProductList_api);
router.post("/subcategory_list",websiteControllers.Sub_Category_List);
router.post("/subcategory_buyProduct_list",websiteControllers.subcategoryBuyProduct_list);
router.post("/subcategory_rentProduct_list",websiteControllers.subcategoryRentProduct_list);
router.post("/sortAsc_product_list",websiteControllers.SortProduct_list);
router.post("/sortDsc_product_list",websiteControllers.SortProductDsc_list);


module.exports=router;