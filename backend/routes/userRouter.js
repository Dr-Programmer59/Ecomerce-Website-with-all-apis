const express=require("express")
const  {registerUser,loginUser, logoutUser, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAlluser, getSingleuser, updateUserRole, deleteUser}=require("../controllers/userController")
const {isAuthenticatedUser,isAuthorizeRole}=require("../middleware/auth")
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser,getUserDetail);
router.route("/me/update").post(isAuthenticatedUser,updateProfile);

router.route("/me/update/password").put(isAuthenticatedUser,updatePassword)
router.route("/admin/users").get(isAuthenticatedUser,isAuthorizeRole("admin"),getAlluser)
router.route("/admin/user/:id").get(isAuthenticatedUser,isAuthorizeRole("admin"),getSingleuser).put(isAuthenticatedUser,isAuthorizeRole("admin"),updateUserRole).delete(isAuthenticatedUser,isAuthorizeRole("admin"),deleteUser)


module.exports=router;
