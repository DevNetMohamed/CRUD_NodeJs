const jwt = require('jsonwebtoken')
exports.auth = (req, res, next) => {
  const {authorization} = req.headers
    if(!authorization){
        return res.status(422).json({
            status: "fail",
            mas: "You are not logged in"
        })
    }

    
    try{
        let decoded = jwt.verify(authorization, process.env.SECRET)
        // console.log(decoded);
        req.id = decoded.id
        next();
        
    }catch(error){
        res.status(401).json({
            status: "fail",
            message: "You are not authenticated"
        })
    }

};