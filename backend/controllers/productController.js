const Product=require("../models/productModels")
const ErrorHandler=require("../utils/errorhandler")
const AsyncHandler=require("../middleware/AsyncErrorHandler")
const ApiFeature=require("../utils/apifeatures")

exports.createProduct=AsyncHandler( async(req,res,next)=>{
    req.body.user=req.user.id;
    const product=await Product.create(req.body);

    res.status(201).json({
        sucess:true,
        product,
    })
})

exports.getAllProducts=AsyncHandler( async(req,res)=>{
    const productPerPage=2;
    const countProducts=await Product.countDocuments();

    const apifeature=new ApiFeature(Product.find(),req.query).search().filter().pagination(productPerPage)
    
    const products= await apifeature.query;
    console.log(products)

    res.status(200).json({
        sucess:true,
        products,
        countProducts,
    })

})

exports.getProductDetails=AsyncHandler(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        // console.log("some problem occurs")
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
        sucess:"true",
        product
    })
})
exports.updateProduct=AsyncHandler(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).send({
            sucess:false,
            msg:"Product not Found",
        })
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).send({
        sucess:true,
        msg:"Sucessfully updated",
    })
})


exports.deleteProduct=AsyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    await Product.deleteOne(product);
    res.status(200).json({
        sucess:true,
        msg:"Product Deleted Sucessfully"
    })
})


exports.createProductReview=AsyncHandler(async(req,res,next)=>{
    const product=await Product.findById(req.params.productId);

    const review={
        user:req.user._id,
        name:req.name,
        rating:Number(req.rating),
        comment
    };

    const isReviewed=product.find(rev=>rev.reviews.user.toString()===req.user._id.toString())
    
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id){
                rev.name=review.name;
                rev.rating=review.rating;
            }
        })

    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let sum=0;
    product.reviews.forEach(rev=>sum+=rev.rating);
    product.ratings=sum/product.reviews.length;

    product.save({validateBeforeSave:false})
    res.status(200).json({
        sucess:true,
    })


})