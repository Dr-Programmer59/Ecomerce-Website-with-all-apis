// toke  to send on login and signup

const sendToken=(user,res,statusCode)=>{
    const token=user.getJWTToken();
    const  options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
    console.log(options)
    res.status(statusCode).cookie("token",token,options).json({
        sucess:true,
        user,
        token,
    })
}

module.exports=sendToken;
