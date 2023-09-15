const mongoose=require("mongoose")
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")

const userSchema=mongoose.Schema({
    name:{
        type:String, 
        required:[true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed from 30 characters"],
        minLength:[4,"Name should be more then 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        minLength:[8,"Password should be more then 8 characters."],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }

    },
    role:{
        type:String,
        default:"User",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();

    }
    this.password=await bcryptjs.hash(this.password,10)
})
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETKEY,{
        expiresIn:process.env.JWT_EXPIREIN
    });
}
userSchema.methods.comparePassword=function(enteredPassword){
    return bcryptjs.compare(enteredPassword,this.password);
}
userSchema.methods.generateResetPasswordToken=function(){
    const token=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(token).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*10000;
    return token;

}
module.exports=mongoose.model("User",userSchema);
