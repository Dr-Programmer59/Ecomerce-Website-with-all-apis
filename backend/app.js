const express=require("express");
const { model, models } = require("mongoose");
const app=express();
const errorMiddleware=require("./middleware/error")
const cookieParser=require("cookie-parser")
app.use(express.json())
app.use(cookieParser())
// Route imports

const product=require("./routes/productRoute")
const user=require("./routes/userRouter")

//middler ware for error



app.use("/api/v1",product)
app.use("/api/v1",user)

app.use(errorMiddleware)


module.exports=app;
