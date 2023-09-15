const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:
    {
        type:String,
        required:[true,"Please Enter the product name"],
        trim:true,
    }  ,
    description:{
        type:String,
        required:[true," Please Enter the product Description"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter the price of Product"],
        maxLegnth:[8,["Price cannot exceed from 8 characters"]]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
    {
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }
],
    category:{
        type:String,
        required:[true,"Please Enter Product Catgory"],

    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLegnth:[4,"Stock cannot exceed 4 characters"],
        default:1,
    },
    numOfReviews:{
        type:Number,
        default:0,

    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"users",
                // required:true,
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        // required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})


module.exports=mongoose.model("Product",productSchema);
