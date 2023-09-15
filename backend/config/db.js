const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.set('strictQuery', false)
    console.log(process.env.DB_URI)
    mongoose.connect(process.env.DB_URI).then(() => console.log("Database Connected"))
}

module.exports=connectDB;
