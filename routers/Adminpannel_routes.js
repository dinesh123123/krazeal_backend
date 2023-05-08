// import dependancies in the  router files
const express=require("express");
const router=express();
const multer = require("multer");
const pannelControllers=require("../controllers/Adminpannel_controllers");
const auth=require("../middlewere/admin_auth");


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
router.post("/create_product",upload.array('images',5),pannelControllers.Product_api);
router.post("/create_category",upload.single('image'),pannelControllers.Category_api);
router.post("/create_banner",upload.single('image'),pannelControllers.Banner_api);
router.post("/create_offer",upload.single('image'),pannelControllers.Offer_api);
router.post("/create_city_list",upload.single('image'),pannelControllers.Create_city_list);
router.post("/contact_us",pannelControllers.Contact_Us);
router.post("/privacy_pollicy",pannelControllers.Privacy_Pollicy);
router.post("/term_condicition",pannelControllers.Term_Condiction);
router.post("/about_us",pannelControllers.About_Us);
router.post("/faq",pannelControllers.Faqs);
router.post("/features_list",pannelControllers.Features_api);
router.post("/return_pollicy",pannelControllers.return_Pollicy);
router.post("/shipping_pollicy",pannelControllers.Shippingpollicy);
router.post("/refferal_term",pannelControllers.Refferalterm);
router.post("/rent_benifit",pannelControllers.RentBenifit);
router.post("/feedback_list",upload.single('image'),pannelControllers.feedback_api);


router.get("/index",/*auth.isLogin,*/pannelControllers.IndexPage);
router.get("/admin_login",/*auth.isLogout,*/pannelControllers.LoginPage);
router.get("/category",/*auth.isLogin,*/pannelControllers.categorylist);
router.get("/create_category",pannelControllers.CategoryPage);
router.get("/category_delete/:id",pannelControllers.categoryDelete);
router.post("/category_update/:_id",upload.single('image'),pannelControllers.CategoryUpdate);
router.get("/category_update/:_id",pannelControllers.categoryupdate);
router.get("/banner_list",pannelControllers.bannerlist);
router.post("/banner_update/:id",upload.single('image'),pannelControllers.BannerUpdate);
router.get("/banner_update/:id",pannelControllers.bannerupdate);
router.get("/create_banner",pannelControllers.BannerPage);
router.get("/banner_delete/:id",pannelControllers.BannerDelete);
router.get("/offer_list",pannelControllers.Offer_list);
router.get("/offer_delete/:id",pannelControllers.offerDelete);
router.get("/create_offer",pannelControllers. OfferPage);
router.post("/update_offer/:id",upload.single('image'),pannelControllers.offerUpdate);
router.get("/update_offer/:id",pannelControllers.OFFERupdate);
router.get("/city_list",pannelControllers.City_List);
router.post("/update_city/:_id",upload.single('image'),pannelControllers.updateCity);
router.get("/update_city/:_id",pannelControllers.UpdateCity);
router.get("/city_delete/:_id",pannelControllers.cityDelete);
router.post("/admin_login",pannelControllers.AdminSignin);
router.get("/admin_logout",auth.isLogout,pannelControllers.AdminSignin);
router.get("/product_list",pannelControllers.productlist);
router.get("/create_product",pannelControllers.ProductPage);
router.get("/delete_product/:id",pannelControllers.productDelete);
router.get("/update_product/:id",pannelControllers.updateproducts);
router.post("/update_product/:id",upload.array('images',5),pannelControllers. UpdateProducts);
router.get("/subcategory",auth.isLogin,pannelControllers.subcategorylist);
router.get("/subcategory_delete/:id",pannelControllers.subcategoryDelete);
router.post("/subcategory_update/:id",upload.single('image'),pannelControllers.SubcategoryUpdate);
router.get("/subcategory_update/:id",pannelControllers.subcategoryupdate);
router.get("/create_subcategory",pannelControllers.SubCategoryPage);
router.get("/contactList",pannelControllers.contactlist);
router.get("/contact_update/:id",pannelControllers.updatecontact);
router.post("/contact_update/:id",pannelControllers.Updatecontact);
router.get("/user_list",pannelControllers.userList);
router.get("/user/:id",pannelControllers.UserDetail);
router.get("/termList",pannelControllers.termlist);
router.get("/term_update/:id",pannelControllers.updateTerm);
router.post("/term_update/:id",pannelControllers.UpdateTerm);
router.get("/privacyList",pannelControllers.pollicylist);
router.get("/pollicy_update/:id",pannelControllers.updatepollicy);
router.post("/pollicy_update/:id",pannelControllers.UpdatePollicy);
router.get("/aboutList",pannelControllers. aboutlist);
router.get("/about_update/:id",pannelControllers.updateabout);
router.post("/about_update/:id",pannelControllers.UpdateAbout);
router.get("/shipping_pollicyList",pannelControllers.shipping_pollicylist);
router.get("/shipping_pollicy_update/:id",pannelControllers.updateshipping_pollicy);
router.post("/shipping_pollicy_update/:id",pannelControllers.Updateshipping_pollicy);
router.get("/return_pollicyList",pannelControllers.return_pollicylist);
router.get("/return_pollicy_update/:id",pannelControllers.updatereturn_pollicy);
router.post("/return_pollicy_update/:id",pannelControllers.Updatereturn_pollicy);
router.get("/faqList",pannelControllers.faqlist);
router.get("/faq_update/:id",pannelControllers.updatefaq);
router.post("/faq_update/:id",pannelControllers.Updatefaq);
router.get("/rentBenifitesList",pannelControllers.rentBenifiteslist);
router.get("/rentBenifites_update/:id",pannelControllers.updaterentBenifites);
router.post("/rentBenifites_update/:id",pannelControllers.UpdaterentBenifites);
router.get("/refferalTermList",pannelControllers.refferallist);
router.get("/refferalTerm_update/:id",pannelControllers.updaterefferal);
router.post("/refferalTerm_update/:id",pannelControllers.Updaterefferal);






module.exports=router;