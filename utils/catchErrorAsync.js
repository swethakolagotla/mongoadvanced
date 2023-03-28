const catchErrorAsync=fn=>(req,res,next)=>{
    fn(req,res,next).catch(err=>next(err))//here it returns a function of(req,res,next)
}
export default catchErrorAsync