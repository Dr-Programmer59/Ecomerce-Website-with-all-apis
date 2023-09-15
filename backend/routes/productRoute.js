const express=require("express");
const { getAllProducts ,createProduct,updateProduct,deleteProduct, getProductDetails} = require("../controllers/productController");
const {isAuthenticatedUser,isAuthorizeRole} =require("../middleware/auth")
const router=express.Router();
const {createUserReviews}=require("../controllers/userController")

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,createProduct);
router.route("/product/review").put(isAuthenticatedUser,createUserReviews);

router.route("/product/:id")
.get(isAuthenticatedUser,getProductDetails)
.put(isAuthenticatedUser,isAuthorizeRole("admin"),updateProduct)
.delete(isAuthenticatedUser,isAuthorizeRole("admin"),deleteProduct);

router.route("/review").put(isAuthenticatedUser,createUserReviews)





module.exports=router;
