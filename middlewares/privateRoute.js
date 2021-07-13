const jwt = require("jsonwebtoken");
const secret = require("../keys/secret")

async function privateRoute(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log("In privateRoute", token)
        const decoded = jwt.verify(token, secret)
        if(!decoded) {
            return res.status(403).json({success: false, error: "Forbidden Request"})
        }
        next();
    }catch(err){
        console.log("In PrivateRouter Error", err)
        res.status(401).json({success: false, error: err})
    }
}

module.exports = { privateRoute }