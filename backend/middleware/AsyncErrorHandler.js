module.exports=(theFunct)=>(req,res,next)=>{
    Promise.resolve(theFunct(req,res,next)).catch(next)
}