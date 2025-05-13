const adminMiddleware=(req,res,next)=>{
    if(req?.user && req?.user?.role==='admin' && req?.user?.email === "admin@gmail.com" ){
        next();       
    }else{
        return res.status(403).json({
            message: "You are not authorized to access this page"
        })
    }
}

module.exports = adminMiddleware;