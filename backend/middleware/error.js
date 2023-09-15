const ErrorHandler=require("../utils/errorhandler")


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message||"Internall Server Error";
    if(err.name=="CastError"){
        const message=`Resource Not found. Inavlid Path ${err.path}`
        err=new ErrorHandler(message,400);

    }
    res.status(err.statusCode).json({
        sucess:false,
        message:err.message
    })
}