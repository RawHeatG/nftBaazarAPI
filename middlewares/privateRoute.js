const jwt = require("jsonwebtoken");
const secret = require("../keys/secret")

async function privateRoute(req, res, next) {
    try{
        const username = req.body.username;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret)
        if(decoded){
            next()
        }
    }catch(err){
        res.status(401).json({success: false, error: err})
    }
}

module.exports = { privateRoute }