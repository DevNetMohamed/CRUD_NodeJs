exports.catchAsync = (fn)=>{
    return (req, res, next)=>{
        fn(req, res, next).chath(next)
    }
}


