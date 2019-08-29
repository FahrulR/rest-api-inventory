require('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports = {
// Verify Token
verifyToken:(req, res, next)=>{
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next the middleware
        
        try{
            const decoded = jwt.verify(req.token, process.env.JWT)
            if(decoded){
                console.log(decoded)
                next()
            } else { throw new Error(decoded)}
        } catch(err){
            console.error(err)
            res.status(403).json({
                status: 403,
                error: true,
                message: 'Your token is invalid or expired'
            })
        }
        
    } else {
        //forbidden unauthorized
        res.status(401).json({
            status: 401,
            error: true,
            message: 'Please authorized before accessing this methods'
        })
    }
}
}
