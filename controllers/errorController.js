const developmentErrors=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        err,
        message:err.message,
        stack:err.stack
    })
}
const ProductionErrors=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}
const globalErrorHandling=(err,req,res,next)=>{
//console.log('smoething broke')
err.statusCode=err.statusCode||500
err.status=err.status||'server failure'
if (process.env.NODE_ENV==="development") developmentErrors(err, res)
else ProductionErrors(err,res)
}
export  default globalErrorHandling