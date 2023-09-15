const app=require("./app")

const dotenv=require("dotenv")
const DB=require("./config/db")


process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server on unhandled rejection")
    process.exit(1);
})


dotenv.config({path:"backend/config/config.env"})

// connecting to databse
DB();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is waiting on http://localhost:${process.env.PORT}`)
})
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server on unhandled rejection")
    server.close(()=>{
        process.exit(1);
    })
})