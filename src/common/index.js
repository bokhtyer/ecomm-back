const jwt = require("jsonwebtoken");
exports.requireSignIn = (req,res,next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            code:"UNAUTHORIZED_REQUEST",
            message:"Unauthorized request"
        });
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).send({
            code:"ACCESS_DENIED",
            message:"Access denied. No token provided."
        });
    }
    try {
        const user = jwt.verify(token, process.env.SCERET);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send({
            code:"INVALID_TOKEN",
            message:"Invalid token."
        });
    }
}


exports.userMiddleware = (req,res,next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message:"User Access Denied"
        })
    }
    next();
}

exports.adminMiddleware = (req,res,next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message:"Admin Access Denied"
        })
    }
    next();
}
